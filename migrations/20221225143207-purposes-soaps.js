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
  return db.createTable('purposes_soaps', {

    id: { type: 'int', primaryKey: true, autoIncrement: true },
    purpose_id: {
      type: 'int',
      notNull: true,
      unsigned: true,
      foreignKey: {
        name: 'purposes_soaps_purpose_fk',
        table: 'purposes',
        rules: {
          onDelete: 'CASCADE',
          onUpdate: 'RESTRICT'
        },
        mapping: 'id'
      }
    },
    soap_id: {
      type: 'int',
      notNull: true,
      unsigned: true,
      foreignKey: {
        name: 'purposes_soaps_soap_fk',
        table: 'soaps',
        rules: {
          onDelete: 'CASCADE',
          onUpdate: 'RESTRICT'
        },
        mapping: 'id'
      }
    }

  });
};

exports.down = function(db) {
  db.removeForeignKey('purposes_soaps', 'purposes_soaps_purpose_fk');
  db.removeForeignKey('purposes_soaps', 'purposes_soaps_soap_fk');
  return db.dropTable('purposes_soaps');

};

exports._meta = {
  "version": 1
};
