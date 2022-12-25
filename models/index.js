const bookshelf = require('../bookshelf')




const Base = bookshelf.model('Base', {
    tableName: 'bases',
    soaps(){
        return this.hasMany('Soap', 'base_id')
    }
});

const Oil = bookshelf.model('Oil', {
    tableName: 'oils',
    soaps(){
        return this.hasMany('Soap')
    }
});

const Type = bookshelf.model('Type', {
    tableName: 'types',
    soaps(){
        return this.hasMany('Soap')
    }
});

const Purpose = bookshelf.model('Purpose', {
    tableName: 'purposes',
});

const Smell = bookshelf.model('Smell', {
    tableName: 'smells',
});

const Color = bookshelf.model('Color', {
    tableName: 'colors',
});

const Role = bookshelf.model('Role', {
    tableName: 'roles',
    accounts() {
        return this.hasMany('Account')
    }
});

const OrderStatus = bookshelf.model('OrderStatus', {
    tableName: 'order_statuses',
    orders(){
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
    Soap
};
