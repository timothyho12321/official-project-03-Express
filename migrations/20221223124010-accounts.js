'use strict';

var dbm;
var type;
var seed;

/**
  * We receive the dbmigrate dependency from dbmigrate initially.
  * This enables us to not have to rely on NODE_PATH.
  */
exports.setup = function (options, seedLink) {
  dbm = options.dbmigrate;
  type = dbm.dataType;
  seed = seedLink;
};

exports.up = function (db) {
  return db.createTable('accounts', {
    'id': {
      type: "int",
      primaryKey: true,
      autoIncrement: true,
      unsigned: true
    },
    'first_name': {
      type: "string",
      length: 50,
      notNull: true
    },
    'last_name': {
      type: "string",
      length: 50,
      notNull: true
    },
    'contact_number': {
      type: "int",
      unsigned: true,
      notNull: true
    },
    'email': {
      type: "string",
      length: 320,
      notNull: true
    },
    'password': {
      type: "string",
      length: 200,
      notNull: true
    },
    'created_date': {
      type: "date",
      notNull: true
    },
    'modified_date': {
      type: "date",
    },
    // 'shipping_country': {
    //   type: "string",
    //   length: 20,
    //   notNull: true
    // },
    // 'shipping_address_1': {
    //   type: "string",
    //   length: 150,
    //   notNull: true
    // },
    // 'shipping_address_2': {
    //   type: "string",
    //   length: 150,
    //   notNull: true
    // },
    // 'shipping_postal_code': {
    //   type: "string",
    //   length: 15,
    //   notNull: true
    // }

  })

};

exports.down = function (db) {
  return db.dropTable('accounts');
};

exports._meta = {
  "version": 1
};
