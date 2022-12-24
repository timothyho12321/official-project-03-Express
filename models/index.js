const bookshelf = require('../bookshelf')


const Base = bookshelf.model('Base', {
    tableName: 'bases',
});


const Oil = bookshelf.model('Oil', {
    tableName: 'oils',
});

const Type = bookshelf.model('Type', {
    tableName: 'types',
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
    }
})


const Order = bookshelf.model('Order', {
    tableName: 'orders',
    order_status() {
        return this.belongsTo('OrderStatus')
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
    Order
};
