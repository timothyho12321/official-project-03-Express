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
  return db.addColumn('accounts', 'role_id',{
    'type':'int',
    'unsigned': true,
    'notNull':true,
   
    'foreignKey': {
      'name':'account_role_fk',
      'table':'roles',
      'mapping':'id',
      'rules':{
        'onDelete': 'cascade',
        'onUpdate': 'restrict'
      }
    }    
});

};

exports.down = function(db) {
  db.removeForeignKey('accounts','account_role_fk');
  return db.removeColumn('accounts','role_id');
};

exports._meta = {
  "version": 1
};
