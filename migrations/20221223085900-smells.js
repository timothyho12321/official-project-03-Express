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
  return db.createTable('smells', {
    'id': {
      type: "int",
      primaryKey: true,
      autoIncrement: true,
      unsigned: true
    },
    'smell': {
      type: "string",
      length: 30,
      notNull: true
    },
    'strength': {
      type: "string",
      length: 20,
      notNull: true
    } , 
    'durable': {
      type: "string",
      length: 20,
      notNull: true
    }

  })
};

exports.down = function (db) {
  return db.dropTable('smells')
};

exports._meta = {
  "version": 1
};
