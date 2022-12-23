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
  db.insert("order_statuses", ['status'], ['Paid']);
  db.insert("order_statuses", ['status'], ['Processing']);
  db.insert("order_statuses", ['status'], ['Pending']);
  db.insert("order_statuses", ['status'], ['Shipping']);
  db.insert("order_statuses", ['status'], ['Delivered']);
  db.insert("order_statuses", ['status'], ['Completed']);
  return null;
};

exports.down = function(db) {
  return null;
};

exports._meta = {
  "version": 1
};
