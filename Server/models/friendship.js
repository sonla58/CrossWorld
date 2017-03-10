var Sequelize = require('sequelize');
var db = require('../config/database.js');
var sequelize = new Sequelize(db.database, db.user, db.password, db);

var Friendship = undefined;
module.exports.connect = function (callback) {
    Friendship = sequelize.define('Friendship', {
        user_id_1: {
            type: Sequelize.STRING,
            primaryKey: true
        },
        user_id_2: {
            type: Sequelize.STRING,
            allowNull: false
        },
        time: {
            type: Sequelize.DATETIME,
            allowNull: false
        }
    }, {
        timestamps: false,
        createAt: false,
        updateAt: false,
        tableName: 'friendship'
    });
};

exports.disconnect = function (callback) {
    sequelize.close();
};

exports.create = function (data, callback) {
    var itemAttach = Friendship.build(data);
    itemAttach.save().then(function (row) {
        callback(null, row);
    }).catch(function (err) {
        callback(err, null);
    })
};


exports.findAll = function (callback) {
    Friendship.findAll({
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
    Friendship.findOne({
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
    Friendship.findOne({
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