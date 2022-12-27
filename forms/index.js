// import in caolan forms
const forms = require("forms");
// create some shortcuts
const fields = forms.fields;
const validators = forms.validators;
const widgets = forms.widgets;

var bootstrapField = function (name, object) {
    if (!Array.isArray(object.widget.classes)) { object.widget.classes = []; }

    if (object.widget.classes.indexOf('form-control') === -1) {
        object.widget.classes.push('form-control');
    }

    var validationclass = object.value && !object.error ? 'is-valid' : '';
    validationclass = object.error ? 'is-invalid' : validationclass;
    if (validationclass) {
        object.widget.classes.push(validationclass);
    }

    var label = object.labelHTML(name);
    var error = object.error ? '<div class="invalid-feedback">' + object.error + '</div>' : '';

    var widget = object.widget.toHTML(name, object);
    return '<div class="form-group" style="width:80%">' + label + widget + error + '</div>';
};


const createProductForm = (allSmells = [], 
    allPurposes = [],allBases=[], allOils = [],
    allTypes=[]) => {
    return forms.create({
        'name': fields.string({
            required: true,
            errorAfterField: true,
            cssClasses: {
                label: ['form-label']
            }
        }),
        'cost': fields.number({
            required: true,
            errorAfterField: true,
            cssClasses: {
                label: ['form-label']
            },
            validators: [validators.integer(),validators.min(0)]
        }),
        'width': fields.number({
            required: true,
            errorAfterField: true,
            cssClasses: {
                label: ['form-label']
            },
            validators: [validators.integer(),validators.min(0)]
        
        }),
        'height': fields.number({
            required: true,
            errorAfterField: true,
            cssClasses: {
                label: ['form-label']
            },
            validators: [validators.integer(),validators.min(0)]
        
        }),
        'shape': fields.string({
            required: true,
            errorAfterField: true,
            cssClasses: {
                label: ['form-label']
            }
        }),
        'date_created': fields.date({
            label: "Date Created",
            required: true,
            errorAfterField: true,
            cssClasses: {
                label: ['form-label']
            },
            widget:widgets.date() 
        }),
        'last_updated': fields.date({
            label: "Last Updated",
            required: false,
            errorAfterField: true,
            cssClasses: {
                label: ['form-label']
            },
            widget:widgets.date() 
        }),
        'base_id': fields.number({
            label: "Base",
            required: true,
            errorAfterField: true,
            cssClasses: {
                label: ['form-label']
            },
            widget: widgets.select(),
            choices: allBases
        }),
        'oil_id': fields.number({
            label: "Oil",
            required: true,
            errorAfterField: true,
            cssClasses: {
                label: ['form-label']
            },
            widget: widgets.select(),
            choices: allOils
        }),
        'type_id': fields.number({
            label: "Type",
            required: true,
            errorAfterField: true,
            cssClasses: {
                label: ['form-label']
            },
            widget: widgets.select(),
            choices: allTypes
        }),
        'purposes': fields.string({
            label: "Purposes",
            required: true,
            errorAfterField: true,
            cssClasses: {
                label: ['form-label']
            },
            widget: widgets.multipleSelect(),
            choices: allPurposes
        }),
        'smells': fields.string({
            label: "Smells",
            required: true,
            errorAfterField: true,
            cssClasses: {
                label: ['form-label']
            },
            widget: widgets.multipleSelect(),
            choices: allSmells
        }),
        'image_url': fields.string({
            required: false,
            errorAfterField: true,
            cssClasses: {
                label: ['form-label']
            },
        }),
        'thumbnail_url': fields.string({
            required: false,
            errorAfterField: true,
            cssClasses: {
                label: ['form-label']
            },
        })
    })
};

module.exports = {
    bootstrapField,
    createProductForm
}