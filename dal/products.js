const express = require("express");
const { Oil, Smell, Purpose, Type, Base } = require("../models");


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




module.exports =
{
    getAllOils,
    getAllSmells,
    getAllPurposes,
    getAllBases,
    getAllTypes
}