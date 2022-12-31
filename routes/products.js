const express = require("express");
const dataLayer = require("../dal/products");


const { createProductForm, bootstrapField, createSearchForm, createVariantForm } = require("../forms");
const { Account, Soap, Order, Base, Variant, CartItem, OrderItem, Type, Smell, Purpose, Oil, Color } = require("../models");
const router = express.Router();


router.get('/', async (req, res) => {

    const allOils = await dataLayer.getAllOils();


    const allSmells = await dataLayer.getAllSmells();


    allOils.unshift([0, '---------------']);

    const searchForm = createSearchForm(allSmells,
        allOils);

    const q = Soap.collection();

    searchForm.handle(req, {
        'success': async function (form) {

            if (form.data.name) {
                q.where('name', 'like', '%' + form.data.name + "%");
            }

            if (form.data.min_cost) {
                q.where('cost', '>=', form.data.min_cost)

            }

            if (form.data.max_cost) {
                q.where('cost', '<=', form.data.max_cost)

            }


            if (form.data.min_height) {
                q.where('height', '>=', form.data.min_height)

            }

            if (form.data.max_height) {
                q.where('height', '<=', form.data.max_height)

            }

            if (form.data.min_width) {
                q.where('width', '>=', form.data.min_width)

            }

            if (form.data.max_width) {
                q.where('width', '<=', form.data.max_width)
            }


            if (form.data.oil_id) {
                q.where('oil_id', '=', form.data.oil_id)

            }

            if (form.data.smells) {
                q.query('join', 'smells_soaps', 'soaps.id', 'soap_id')
                    .where('smell_id', 'in', form.data.smells.split(','))
            }

            const products = await q.fetch({
                withRelated: ['base', 'oil', 'type', 'purposes', 'smells']
            })

            res.render(
                'products/index',
                {
                    'products': products.toJSON(),
                    'form': form.toHTML(bootstrapField)
                })
        },
        'empty': async function (form) {
            const products = await q.fetch({
                withRelated: ['base', 'oil', 'type', 'purposes', 'smells']
            })


            res.render(
                'products/index',
                {
                    'products': products.toJSON(),
                    'form': form.toHTML(bootstrapField)
                })


        },
        'error': async function (form) {
            const products = await q.fetch({
                withRelated: ['base', 'oil', 'type', 'purposes', 'smells']
            })

            console.log(products.toJSON())

            res.render(
                'products/index',
                {
                    'products': products.toJSON(),
                    'form': form.toHTML(bootstrapField)
                })
        }

    })







})


///////////////////////////////////// Create Route /////////////////////////////////
router.get('/create', async (req, res) => {

    const allSmells = await dataLayer.getAllSmells();

    const allPurposes = await dataLayer.getAllPurposes();

    const allBases = await dataLayer.getAllBases();

    const allOils = await dataLayer.getAllOils();

    const allTypes = await dataLayer.getAllTypes();


    const productForm = createProductForm(allSmells,
        allPurposes, allBases, allOils, allTypes);

    res.render('products/create', {
        'form': productForm.toHTML(bootstrapField),
        cloudinaryName: process.env.CLOUDINARY_NAME,
        cloudinaryApiKey: process.env.CLOUDINARY_API_KEY,
        cloudinaryPreset: process.env.CLOUDINARY_UPLOAD_PRESET

    })


})


router.post('/create', async (req, res) => {

    const allSmells = await dataLayer.getAllSmells();

    const allPurposes = await dataLayer.getAllPurposes();

    const allBases = await dataLayer.getAllBases();


    const allOils = await dataLayer.getAllOils();

    const allTypes = await dataLayer.getAllTypes();


    const productForm = createProductForm(allSmells,
        allPurposes, allBases, allOils, allTypes);


    productForm.handle(req, {
        'success': async function (form) {

            const productObject = new Soap();

            let { purposes, smells, ...otherData } = form.data;
            productObject.set(otherData);
            await productObject.save();


            if (purposes) {
                await productObject.purposes().attach(purposes.split(","))
            }

            if (smells) {
                await productObject.smells().attach(smells.split(","))
            }

            req.flash("success_messages", `New Item ${productObject.get('name')} has been created`)

            res.redirect('/products')
        },
        'empty': async function (form) {


            res.render('products/create', {
                'form': form.toHTML(bootstrapField),

            })
        },
        'error': async function (form) {
            res.render('products/create', {
                'form': form.toHTML(bootstrapField),

            })

        }

    })

})

//////////////////////////////////// END OF CREATE ROUTE //////////////////

//////////////////////////////////// START OF UPDATE ROUTE ////////////////

router.get("/update/:soap_id", async function (req, res) {

    const soapId = req.params.soap_id;

    const findSoap = await Soap.where({
        'id': soapId
    }).fetch({
        require: true,
        withRelated: ['smells', 'purposes']
    })

    // console.log(findSoap);


    const allSmells = await dataLayer.getAllSmells();

    const allPurposes = await dataLayer.getAllPurposes();

    const allBases = await dataLayer.getAllBases();


    const allOils = await dataLayer.getAllOils();

    const allTypes = await dataLayer.getAllTypes();


    const productForm = createProductForm(allSmells,
        allPurposes, allBases, allOils, allTypes);



    productForm.fields.name.value = findSoap.get('name');
    productForm.fields.cost.value = findSoap.get('cost');
    productForm.fields.width.value = findSoap.get('width');
    productForm.fields.height.value = findSoap.get('height');
    productForm.fields.shape.value = findSoap.get('shape');
    productForm.fields.date_created.value = findSoap.get('date_created');
    productForm.fields.last_updated.value = findSoap.get('last_updated');
    productForm.fields.base_id.value = findSoap.get('base_id');
    productForm.fields.oil_id.value = findSoap.get('oil_id');
    productForm.fields.type_id.value = findSoap.get('type_id');
    productForm.fields.image_url.value = findSoap.get('image_url');
    productForm.fields.thumbnail_url.value = findSoap.get('thumbnail_url');


    let oldSmells = await findSoap.related('smells').pluck('id')
    console.log(oldSmells);

    let oldPurposes = await findSoap.related('purposes').pluck('id')
    console.log(oldPurposes);

    productForm.fields.smells.value = oldSmells;
    productForm.fields.purposes.value = oldPurposes;



    res.render('products/update', {
        'form': productForm.toHTML(bootstrapField),
        'soap': findSoap.toJSON(),
        cloudinaryName: process.env.CLOUDINARY_NAME,
        cloudinaryApiKey: process.env.CLOUDINARY_API_KEY,
        cloudinaryPreset: process.env.CLOUDINARY_UPLOAD_PRESET
    });


})



router.post("/update/:soap_id", async function (req, res) {

    const soapId = req.params.soap_id;

    const findSoap = await Soap.where({
        'id': soapId
    }).fetch({
        require: true,
        withRelated: ['smells', 'purposes']
    })

    const allSmells = await dataLayer.getAllSmells();

    const allPurposes = await dataLayer.getAllPurposes();

    const allBases = await dataLayer.getAllBases();


    const allOils = await dataLayer.getAllOils();

    const allTypes = await dataLayer.getAllTypes();


    const productForm = createProductForm(allSmells,
        allPurposes, allBases, allOils, allTypes);

    productForm.handle(req, {
        'success': async function (form) {


            let { purposes, smells, ...otherData } = form.data;

            console.log("otherdata", otherData)
            findSoap.set(otherData);
            await findSoap.save();

            let oldSmells = await findSoap.related('smells').pluck('id')
            // console.log(oldSmells);

            let oldPurposes = await findSoap.related('purposes').pluck('id')
            // console.log(oldPurposes);

            try {
                await findSoap.smells().detach(oldSmells);
                await findSoap.smells().attach(smells.split(","));
            }
            catch (e) {

                console.log(e)
            }

            try {
                await findSoap.purposes().detach(oldPurposes);
                await findSoap.purposes().attach(purposes.split(","));

            } catch (e) {
                console.log(e)
            }



            // res.send("send message to check if product route is the issue")
            res.redirect('/products')
        },
        'empty': async function (form) {
            res.render('products/create', {
                'form': form.toHTML(bootstrapField),
            })
        },
        'error': async function (form) {
            res.render('products/create', {
                'form': form.toHTML(bootstrapField),
            })

        }

    })

})

//////////////////////////////////// END OF UPDATE ROUTE ////////////////

//////////////////////////////////// START OF DELETE ROUTE ////////////////


router.get('/delete/:soap_id', async function (req, res) {

    const soapId = req.params.soap_id

    const findSoap = await Soap.where({
        'id': soapId
    }).fetch({
        require: true,
        withRelated: ['smells', 'purposes']
    })


    res.render('products/delete', {
        'product': findSoap.toJSON()
    })


})


router.post('/delete/:soap_id', async function (req, res) {

    const soapId = req.params.soap_id

    const findSoap = await Soap.where({
        'id': soapId
    }).fetch({
        require: true,
        withRelated: ['smells', 'purposes']
    })


    await findSoap.destroy();

    res.redirect('/products');

})



//////////////////////////////////// END OF DELETE ROUTE ////////////////


//////////////////////////////////// START OF VARIANT ///////////////////


//////////////////////////////////// START OF READ FOR VARIANT ////////////////


router.get('/:soap_id/variants', async (req, res) => {

    const soapId = req.params.soap_id

    const variants = await Variant.where({
        'soap_id': soapId
    }).fetchAll({
        withRelated: ['soap', 'color'],
        require: false
    })

    //     let a = variants.toJSON();
    console.log("variant details", variants.toJSON());
    // console.log("Variant name",a[0].name)


    const soap = await Soap.where({
        'id': soapId
    }).fetch({
        withRelated: ['base', 'oil', 'type', 'purposes', 'smells'],
        require: true
    })


    res.render("variants/index", {
        'soap': soap.toJSON(),
        'variants': variants.toJSON(),
        'variants-date': variants.toJSON()
    })

})

//////////////////////////////////// END OF READ FOR VARIANT ////////////////

//////////////////////////////////// START OF CREATE ROUTE ////////////////


router.get("/:product_id/variants/create", async (req, res) => {



    const allColors = await Color.fetchAll().map(s =>
        [s.get("id"), s.get("color")])


    console.log("color options", allColors);

    const variantForm = createVariantForm(allColors);


    res.render("variants/create", {
        form: variantForm.toHTML(bootstrapField),
        cloudinaryName: process.env.CLOUDINARY_NAME,
        cloudinaryApiKey: process.env.CLOUDINARY_API_KEY,
        cloudinaryPreset: process.env.CLOUDINARY_UPLOAD_PRESET
    })
})

router.post("/:soap_id/variants/create", async (req, res) => {
    let soapId = req.params.soap_id

    const allColors = await Color.fetchAll().map(s =>
        [s.get("id"), s.get("color")])

    console.log("color options", allColors);

    const soap = await Soap.where({
        'id': soapId
    }).fetch({
        withRelated: ['base', 'oil', 'type', 'purposes', 'smells'],
        require: true
    })


    const variantForm = createVariantForm(allColors);
    variantForm.handle(req, {
        'success': async function (form) {

            const variantObject = new Variant();

            let newObject = form.data
            newObject.soap_id = soapId
            // console.log("new object",newObject);

            variantObject.set(newObject);
            await variantObject.save();

            req.flash("success_messages", `Variant for the ${variantObject.get('name')} has been added`)

            res.redirect(`/products/${soapId}/variants`)
        },
        'error': function (form) {


            res.render(`variants/${soapId}/create`, {
                'form': form.toHTML(bootstrapField),
                cloudinaryName: process.env.CLOUDINARY_NAME,
                cloudinaryApiKey: process.env.CLOUDINARY_API_KEY,
                cloudinaryPreset: process.env.CLOUDINARY_UPLOAD_PRESET
            })
        },
        'empty': function (form) {


            res.render(`variants/${soapId}/create`, {
                'form': form.toHTML(bootstrapField),
                cloudinaryName: process.env.CLOUDINARY_NAME,
                cloudinaryApiKey: process.env.CLOUDINARY_API_KEY,
                cloudinaryPreset: process.env.CLOUDINARY_UPLOAD_PRESET
            })
        }
    })
})

//////////////////////////////////// END OF CREATE FOR VARIANT ////////////////

//////////////////////////////////// START OF UPDATE FOR VARIANT ////////////////


router.get("/:soap_id/variants/:variant_id/update", async (req, res) => {

    const variantId = req.params.variant_id;
    const soapId = req.params.soap_id;
    const allColors = await Color.fetchAll().map(s =>
        [s.get("id"), s.get("color")])


    // console.log("color options", allColors);

    const variantForm = createVariantForm(allColors);

    const findVariant = await Variant.where({
        'id': variantId
    }).fetch({
        withRelated: ['soap', 'color'],
        require: true
    })

    // console.log(findVariant.toJSON());
    variantForm.fields.name.value = findVariant.get('name');
    variantForm.fields.stock.value = findVariant.get('stock');
    variantForm.fields.last_updated.value = findVariant.get('last_updated');
    variantForm.fields.color_id.value = findVariant.get('color_id');
    variantForm.fields.image_url.value = findVariant.get('image_url');
    variantForm.fields.thumbnail_url.value = findVariant.get('thumbnail_url');

    // `${productId}/variants/${productId}/update`
    res.render("variants/update", {
        form: variantForm.toHTML(bootstrapField),
        variant: findVariant.toJSON(),
        cloudinaryName: process.env.CLOUDINARY_NAME,
        cloudinaryApiKey: process.env.CLOUDINARY_API_KEY,
        cloudinaryPreset: process.env.CLOUDINARY_UPLOAD_PRESET
    })
})



router.post("/:soap_id/variants/:variant_id/update", async function (req, res) {

    const variantId = req.params.variant_id;
    const soapId = req.params.soap_id;
    const allColors = await Color.fetchAll().map(s =>
        [s.get("id"), s.get("color")])


    // console.log("color options", allColors);

    const variantForm = createVariantForm(allColors);

    const findVariant = await Variant.where({
        'id': variantId
    }).fetch({
        withRelated: ['soap', 'color'],
        require: true
    })


    variantForm.handle(req, {
        'success': async function (form) {



            let newObject = form.data
            newObject.soap_id = soapId
            // console.log("new object",newObject);

            findVariant.set(newObject);
            await findVariant.save();

            req.flash("success_messages", `Variant for the ${findVariant.get('name')} is updated.`)

            res.redirect(`/products/${soapId}/variants`)
        },
        'error': function (form) {


            res.render(`variants/${soapId}/create`, {
                'form': form.toHTML(bootstrapField),
                cloudinaryName: process.env.CLOUDINARY_NAME,
                cloudinaryApiKey: process.env.CLOUDINARY_API_KEY,
                cloudinaryPreset: process.env.CLOUDINARY_UPLOAD_PRESET
            })
        },
        'empty': function (form) {


            res.render(`variants/${soapId}/create`, {
                'form': form.toHTML(bootstrapField),
                cloudinaryName: process.env.CLOUDINARY_NAME,
                cloudinaryApiKey: process.env.CLOUDINARY_API_KEY,
                cloudinaryPreset: process.env.CLOUDINARY_UPLOAD_PRESET
            })
        }
    })

})

//////////////////////////////////// END OF UPDATE FOR VARIANT ////////////////

//////////////////////////////////// START OF DELETE FOR VARIANT ////////////////



router.get('/:soap_id/variants/:variant_id/delete', async function (req, res) {
    const variantId = req.params.variant_id;
    const soapId = req.params.soap_id

    const findVariant = await Variant.where({
        'id': variantId
    }).fetch({
        withRelated: ['soap', 'color'],
        require: true
    })

    res.render('variants/delete', {
        'variant': findVariant.toJSON(),

    })


})


router.post('/:soap_id/variants/:variant_id/delete', async function (req, res) {

    const soapId = req.params.soap_id;
    const variantId = req.params.variant_id;

    const findVariant = await Variant.where({
        'id': variantId
    }).fetch({
        withRelated: ['soap', 'color'],
        require: true
    })

    const vNameForEnd = findVariant.toJSON();
    console.log(vNameForEnd);

    const soap = await Soap.where({
        'id': soapId
    }).fetch({
        withRelated: ['base', 'oil', 'type', 'purposes', 'smells'],
        require: true
    })


    let deleteHappen = false;
    if (findVariant) {
        deleteHappen = true;
    }

    await findVariant.destroy();


    if (deleteHappen) {
        req.flash('success_messages', `The variant ${vNameForEnd.name} was
     deleted from '${soap.get('name')}'.`)
        res.redirect(`/products/${soapId}/variants`);

    } else {
        req.flash('error_messages', `Deletion failed for variant ${findVariant.get('name')} 
    in '${soap.get('name')}'. Please check again.`)
        res.redirect(`/products/${soapId}/variants`);
    }


})





module.exports = router;