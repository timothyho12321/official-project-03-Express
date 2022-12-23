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
  db.insert("smells", ['smell', 'strength', 'durable'], ['Floral', 'Strong', 'Lasting']);
  db.insert("smells", ['smell', 'strength', 'durable'], ['Fresh', 'Weak', 'Faint']);
  db.insert("smells", ['smell', 'strength', 'durable'], ['Clean', 'Strong', 'Lasting']);
  db.insert("smells", ['smell', 'strength', 'durable'], ['Airy', 'Weak', 'Faint']);
  db.insert("smells", ['smell', 'strength', 'durable'], ['Earthy', 'Strong', 'Lasting']);
  return null;
};

exports.down = function (db) {
  return null;
};

exports._meta = {
  "version": 1
};
