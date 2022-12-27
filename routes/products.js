const express = require("express");
const async = require("hbs/lib/async");
const { createProductForm, bootstrapField } = require("../forms");
const { Account, Soap, Order, Base, Variant, CartItem, OrderItem, Type, Smell, Purpose, Oil } = require("../models");
const router = express.Router();


router.get('/', async (req, res) => {


    const soapwithAll = await Soap.collection().fetch({
        withRelated: ['base', 'oil', 'type', 'purposes', 'smells']
    })


    // console.log(soapwithAll.toJSON())

    // res.json({ 'products': soapwithAll.toJSON() })


    res.render(
        'products/index',
        { 'products': soapwithAll.toJSON() })


})


///////////////////////////////////// Create Route /////////////////////////////////
router.get('/create', async (req, res) => {

    const allSmells = await Smell.fetchAll().map(s =>
        [s.get('id'), s.get('smell')])

    const allPurposes = await Purpose.fetchAll().map(p =>
        [p.get('id'), p.get('purpose')])

    const allBases = await Base.fetchAll().map(b =>
        [b.get('id'), b.get('base')])

    const allOils = await Oil.fetchAll().map(o =>
        [o.get('id'), o.get('oil')])

    const allTypes = await Type.fetchAll().map(t =>
        [t.get('id'), t.get('type')])


    const productForm = createProductForm(allSmells,
        allPurposes, allBases, allOils, allTypes);

    res.render('products/create', {
        'form': productForm.toHTML(bootstrapField),
    })


})


router.post('/create', async (req, res) => {

    const allSmells = await Smell.fetchAll().map(s =>
        [s.get('id'), s.get('smell')])

    const allPurposes = await Purpose.fetchAll().map(p =>
        [p.get('id'), p.get('purpose')])

    const allBases = await Base.fetchAll().map(b =>
        [b.get('id'), b.get('base')])

    const allOils = await Oil.fetchAll().map(o =>
        [o.get('id'), o.get('oil')])

    const allTypes = await Type.fetchAll().map(t =>
        [t.get('id'), t.get('type')])

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

//////////////////////////////////// END OF CREATE ROUTE ////////////////

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


    const allSmells = await Smell.fetchAll().map(s =>
        [s.get('id'), s.get('smell')])

    const allPurposes = await Purpose.fetchAll().map(p =>
        [p.get('id'), p.get('purpose')])

    const allBases = await Base.fetchAll().map(b =>
        [b.get('id'), b.get('base')])

    const allOils = await Oil.fetchAll().map(o =>
        [o.get('id'), o.get('oil')])

    const allTypes = await Type.fetchAll().map(t =>
        [t.get('id'), t.get('type')])

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
        'form': productForm.toHTML(bootstrapField)

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

    const allSmells = await Smell.fetchAll().map(s =>
        [s.get('id'), s.get('smell')])

    const allPurposes = await Purpose.fetchAll().map(p =>
        [p.get('id'), p.get('purpose')])

    const allBases = await Base.fetchAll().map(b =>
        [b.get('id'), b.get('base')])

    const allOils = await Oil.fetchAll().map(o =>
        [o.get('id'), o.get('oil')])

    const allTypes = await Type.fetchAll().map(t =>
        [t.get('id'), t.get('type')])

    const productForm = createProductForm(allSmells,
        allPurposes, allBases, allOils, allTypes);

    productForm.handle(req, {
        'success': async function (form) {


            let { purposes, smells, ...otherData } = form.data;
            findSoap.set(otherData);
            await findSoap.save();

            let oldSmells = await findSoap.related('smells').pluck('id')
            console.log(oldSmells);

            let oldPurposes = await findSoap.related('purposes').pluck('id')
            console.log(oldPurposes);

            await findSoap.smells().detach(oldSmells);
            await findSoap.smells().attach(smells.split(","))


            await findSoap.purposes().detach(oldPurposes);
            await findSoap.purposes().attach(purposes.split(","))


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

module.exports = router;