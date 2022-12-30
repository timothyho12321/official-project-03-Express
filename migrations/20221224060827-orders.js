'use strict';

var dbm;
var type;
var seed;

/**
  * We receive the dbmigrate dependency from dbmigrate initially.
  * This enables us to not have to rely on NODE_PATH.
  */
exports.setup = function(options, seedLink) {
  dbm = options.dbmigrate;
  type = dbm.dataType;
  seed = seedLink;
};

exports.up = function(db) {
  return db.createTable('orders', {
    'id': {
      type: "int",
      primaryKey: true,
      autoIncrement: true,
      unsigned: true
    },
    'total_cost': {
      type: "int",
      notNull: true
    },
    'payment_reference': {
      type: "string",
      length: 150,
      notNull: true
    },
    'payment_type': {
      type: "string",
      length: 80,
      notNull: true
    },
    'receipt_url': {
      type: "string",
      length: 2100,
      notNull: true
    },
    'order_date': {
      type: "datetime",
      notNull: true
    },
    'delivery_date': {
      type: "datetime"
    },
    'shipping_country': {
      type: "string",
      length: 30,
      notNull: true
    },
    'shipping_address_1': {
      type: "string",
      length: 150,
      notNull: true
    },
    'shipping_address_2': {
      type: "string",
      length: 150,
      notNull: true
    },
    'shipping_postal_code': {
      type: "string",
      length: 15,
      notNull: true
    },
    'billing_country': {
      type: "string",
      length: 30,
      notNull: true
    },
    'billing_address_1': {
      type: "string",
      length: 150,
      notNull: true
    },
    'billing_address_2': {
      type: "string",
      length: 150,
      notNull: true
    },
    'billing_postal_code': {
      type: "string",
      length: 15,
      notNull: true
    }
    

})
}
;

exports.down = function(db) {
  return db.dropTable('orders');
};

exports._meta = {
  "version": 1
};
