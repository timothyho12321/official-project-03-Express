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
  return db.createTable('smells_soaps', {

    id: { type: 'int', primaryKey: true, autoIncrement: true },
    smell_id: {
      type: 'int',
      notNull: true,
      unsigned: true,
      foreignKey: {
        name: 'smells_soaps_smell_fk',
        table: 'smells',
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
        name: 'smells_soaps_soap_fk',
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
  db.removeForeignKey('smells_soaps', 'smells_soaps_smell_fk');
  db.removeForeignKey('smells_soaps', 'smells_soaps_soap_fk');
  return db.dropTable('smells_soaps');

};

exports._meta = {
  "version": 1
};
