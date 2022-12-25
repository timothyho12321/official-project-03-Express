// import in caolan forms
const forms = require("forms");
// create some shortcuts
const fields = forms.fields;
const validators = forms.validators;

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
    return '<div class="form-group">' + label + widget + error + '</div>';
};


const createProductForm = () => {
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
            }
        }),
        'width': fields.number({
            required: true,
            errorAfterField: true,
            cssClasses: {
                label: ['form-label']
            }
        }),
        'height': fields.number({
            required: true,
            errorAfterField: true,
            cssClasses: {
                label: ['form-label']
            }
        }),
        'shape': fields.string({
            required: true,
            errorAfterField: true,
            cssClasses: {
                label: ['form-label']
            }
        }),
        'date_created': fields.date({
            required: true,
            errorAfterField: true,
            cssClasses: {
                label: ['form-label']
            }
        }),
        'last_updated': fields.date({
            required: false,
            errorAfterField: true,
            cssClasses: {
                label: ['form-label']
            }
        }),
        'base': fields.number({
            required: true,
            errorAfterField: true,
            cssClasses: {
                label: ['form-label']
            }
        }),
        'oil': fields.number({
            required: true,
            errorAfterField: true,
            cssClasses: {
                label: ['form-label']
            }
        }),
        'type': fields.number({
            required: true,
            errorAfterField: true,
            cssClasses: {
                label: ['form-label']
            }
        }),
        'purposes': fields.number({
            required: true,
            errorAfterField: true,
            cssClasses: {
                label: ['form-label']
            }
        }),
        'smells': fields.number({
            required: true,
            errorAfterField: true,
            cssClasses: {
                label: ['form-label']
            }
        })
    })
};

module.exports = {
    bootstrapField,
    createProductForm
}