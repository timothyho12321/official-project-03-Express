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
  return db.createTable('variants', {
    'id': {
      type: "int",
      primaryKey: true,
      autoIncrement: true,
      unsigned: true
    },
    'image_url': {
      type: "string",
      length: 2500,
      notNull: true
    },
    'thumbnail_url': {
      type: "string",
      length: 2500,
      notNull: true
    },
    'stock': {
      type: "smallint",
      unsigned: true,
      notNull: true
    },
    'name': {
      type: "string",
      length: 30,
      notNull: true
    }
  })
};

exports.down = function(db) {
  return db.dropTable('variants')
};

exports._meta = {
  "version": 1
};
