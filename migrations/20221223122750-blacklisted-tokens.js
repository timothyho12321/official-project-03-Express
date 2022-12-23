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
  return db.createTable('blacklisted_tokens', {
    'id': {
      type: "int",
      primaryKey: true,
      autoIncrement: true,
      unsigned: true
    },
    'token': {
      type: "string",
      length: 7000,
      notNull: true
    },
    'date_created': {
      type: "date",
      notNull: true
    },
  })
};

exports.down = function(db) {
  return db.dropTable('blacklisted_tokens');
};

exports._meta = {
  "version": 1
};
