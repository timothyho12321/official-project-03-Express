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
  return db.addColumn('soaps', 'base_id', {
    'type': 'int',
    'unsigned': true,
    'notNull': true,

    'foreignKey': {
      'name': 'soap_base_fk',
      'table': 'bases',
      'mapping': 'id',
      'rules': {
        'onDelete': 'cascade',
        'onUpdate': 'restrict'
      }
    }
  });
};

exports.down = function(db) {
  db.removeForeignKey('soaps', 'soap_base_fk');
  return db.removeColumn('soaps', 'base_id');
};

exports._meta = {
  "version": 1
};
