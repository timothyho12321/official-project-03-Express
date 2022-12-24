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
  return db.createTable('soaps', {
    'id': {
      type: "int",
      primaryKey: true,
      autoIncrement: true,
      unsigned: true
    },
    'name': {
      type: "string",
      length: 80,
      notNull: true
    },
    'cost': {
      type: "int",
      notNull: true
    },
    'width': {
      type: "smallint",
      notNull: true
    },
    'height': {
      type: "smallint",
      notNull: true
    },
    'shape': {
      type: "string",
      length: 90,
      notNull: true
    },
    'date_created': {
      type: "date",
      notNull: true
    },
    'last_updated': {
      type: "date",
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
    }

  })
};

exports.down = function (db) {
  return db.dropTable('soaps');
};

exports._meta = {
  "version": 1
};
