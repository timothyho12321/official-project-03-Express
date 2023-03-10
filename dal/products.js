const express = require("express");
const { Oil, Smell, Purpose, Type, Base, Variant, Soap } = require("../models");


async function getAllOils() {

    const allOils = Oil.fetchAll().map(o =>
        [o.get('id'), o.get('oil')])

    return allOils;

}


async function getAllSmells() {

    const allSmells = await Smell.fetchAll().map(s =>
        [s.get('id'), s.get('smell')])

    return allSmells;

}


async function getAllPurposes() {

    const allPurposes = await Purpose.fetchAll().map(p =>
        [p.get('id'), p.get('purpose')])
    return allPurposes;

}

async function getAllBases() {

    const allBases = await Base.fetchAll().map(b =>
        [b.get('id'), b.get('base')])
    return allBases;

}


async function getAllTypes() {

    const allTypes = await Type.fetchAll().map(t =>
        [t.get('id'), t.get('type')])

    return allTypes;

}


async function getAllProducts() {

    const allProducts = await Soap.collection().fetch({
        'withRelated': ['base', 'type', 'oil', 'purposes', 'smells']
    })

    return allProducts;

}



async function getVariantById(variantId) {

    const variant = await Variant.where({
        'id': variantId
    }).fetch({
        withRelated: ['soap'],
        require: true
    })


    return variant;

}


async function getVariantByProductId(productId) {

    const variants = await Variant.where({
        'soap_id': productId
    }).fetchAll({
        withRelated: ['soap'],
        require: false
    })


    return variants;

}

async function updateVariantStock(variantId, currentQuantity) {

    const variant = await getVariantById(variantId);

    variant.set('stock', currentQuantity);
    await variant.save();

    return true;

}




module.exports =
{
    getAllOils,
    getAllSmells,
    getAllPurposes,
    getAllBases,
    getAllTypes,
    getVariantById,
    updateVariantStock,
    getAllProducts,
    getVariantByProductId
}