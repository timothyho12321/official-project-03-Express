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
  db.insert("bases", ['base'], ['Goat Milk']);
  db.insert("bases", ['base'], ['Shea Butter']);
  db.insert("bases", ['base'], ['Aloe Vera Melt']);
  db.insert("bases", ['base'], ['Honey Melt']);
  return null;
};

exports.down = function(db) {
  return null;
};

exports._meta = {
  "version": 1
};
