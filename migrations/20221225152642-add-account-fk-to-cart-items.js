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
  return db.addColumn('cart_items', 'account_id', {
    'type': 'int',
    'unsigned': true,
    'notNull': true,

    'foreignKey': {
      'name': 'cart_item_account_fk',
      'table': 'accounts',
      'mapping': 'id',
      'rules': {
        'onDelete': 'cascade',
        'onUpdate': 'restrict'
      }
    }
  })
};

exports.down = function(db) {
  db.removeForeignKey('cart_items', 'cart_item_account_fk');
  return db.removeColumn('cart_items', 'account_id');
 
};

exports._meta = {
  "version": 1
};
