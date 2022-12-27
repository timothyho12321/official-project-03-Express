const bookshelf = require('../bookshelf')




const Base = bookshelf.model('Base', {
    tableName: 'bases',
    soaps() {
        return this.hasMany('Soap', 'base_id')
    }
});

const Oil = bookshelf.model('Oil', {
    tableName: 'oils',
    soaps() {
        return this.hasMany('Soap')
    }
});

const Type = bookshelf.model('Type', {
    tableName: 'types',
    soaps() {
        return this.hasMany('Soap')
    }
});

const Purpose = bookshelf.model('Purpose', {
    tableName: 'purposes',
    soaps() {
        return this.belongsToMany('Soap')
    }
});

const Smell = bookshelf.model('Smell', {
    tableName: 'smells',
    soaps() {
        return this.belongsToMany('Soap')
    }
});

const Color = bookshelf.model('Color', {
    tableName: 'colors',
    variant() {
        return this.hasMany('Variant')
    }
});

const Role = bookshelf.model('Role', {
    tableName: 'roles',
    accounts() {
        return this.hasMany('Account')
    }
});

const OrderStatus = bookshelf.model('OrderStatus', {
    tableName: 'order_statuses',
    orders() {
        return this.hasMany('Order')
    }
});

const BlackListedToken = bookshelf.model('BlackListedToken', {
    tableName: 'blacklisted_tokens',
});

const Account = bookshelf.model('Account', {
    tableName: 'accounts',
    role() {
        return this.belongsTo('Role')
    },
    orders() {
        return this.hasMany('Order')
    }
})


const Order = bookshelf.model('Order', {
    tableName: 'orders',
    order_status() {
        return this.belongsTo('OrderStatus')
    },
    account() {
        return this.belongsTo('Account')
    }
});


const Variant = bookshelf.model('Variant', {
    tableName: 'variants',
    color() {
        return this.belongsTo('Color')
    },
    soap() {
        return this.belongsTo('Soap')
    }
});

const Soap = bookshelf.model('Soap', {
    tableName: 'soaps',
    base() {
        return this.belongsTo('Base', 'base_id')
    },
    oil() {
        return this.belongsTo('Oil')
    },
    type() {
        return this.belongsTo('Type')
    },
    purposes() {
        return this.belongsToMany('Purpose')
    },
    smells() {
        return this.belongsToMany('Smell')
    },
    variant() {
        return this.hasMany('Variant')
    }
});

const CartItem = bookshelf.model('CartItem', {
    tableName: 'cart_items',
    account() {
        return this.belongsTo('Account')
    },
    variant() {
        return this.belongsTo('Variant')
    }
});

const OrderItem = bookshelf.model('OrderItem', {
    tableName: 'order_items',
    order() {
        return this.belongsTo('Order')
    },
    variant() {
        return this.belongsTo('Variant')
    }
});





module.exports =
{
    Base,
    Oil,
    Purpose,
    Type,
    Smell,
    Color,
    Role,
    OrderStatus,
    BlackListedToken,
    Account,
    Order,
    Soap,
    Variant,
    CartItem,
    OrderItem
};
