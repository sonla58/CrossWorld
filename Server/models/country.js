var Sequelize = require('sequelize');
var db = require('../config/database.js');
var sequelize = new Sequelize(db.database, db.user, db.password, db);

var Country = undefined;
module.exports.connect = function (callback) {
    Country = sequelize.define('Country', {
        country_id: {
            type: Sequelize.STRING,
            primaryKey: true
        },
        name: {
            type: Sequelize.STRING,
            allowNull: false
        }
    }, {
        timestamps: false,
        createAt: false,
        updateAt: false,
        tableName: 'country'
    });
};

exports.disconnect = function (callback) {
    sequelize.close();
};

exports.create = function (data, callback) {
    var itemAttach = Country.build(data);
    itemAttach.save().then(function (row) {
        callback(null, row);
    }).catch(function (err) {
        callback(err, null);
    })
};

exports.findAll = function (callback) {
    Country.findAll({
        where: {}
    }).then(function (rows) {
        if (rows) {
            callback(null, rows);
        } else {
            callback(null, null);
        }
    }).catch(function (err) {
        if (err) callback(err, null);
    })
};

exports.findById = function (id, callback) {
    Country.findOne({
        where: {
            customer_id: id
        }
    }).then(function (row) {
        if (row) {
            callback(null, row);
        } else {
            callback(null, null);
        }
    }).catch(function (err) {
        callback(err, null);
    })
};

exports.update = function (data, callback) {
    Country.findOne({
        where: {customer_id: data.customer_id}
    }).then(function (row) {
        if (row) {
            row.update(data).then(function (r) {
                if (r) {
                    callback(null, r);
                }
            }).catch(function (err) {
                if (err) callback(err, null);
            })
        } else {
            callback(null, null);
        }
    }).catch(function (err) {
        if (err) callback(err, null);
    })
};