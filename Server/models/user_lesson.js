var Sequelize = require('sequelize');
var db = require('../config/database.js');
var sequelize = new Sequelize(db.database, db.user, db.password, db);

var UserLesson = undefined;
module.exports.connect = function (callback) {
    UserLesson = sequelize.define('UserLesson', {
        lesson_id: {
            type: Sequelize.INTEGER,
            primaryKey: true
        },
        user_id: {
            type: Sequelize.STRING,
            allowNull: false
        },
        time: {
            type: Sequelize.INTEGER,
            allowNull: false
        }
    }, {
        timestamps: false,
        createAt: false,
        updateAt: false,
        tableName: 'user_lesson'
    });
};

exports.disconnect = function (callback) {
    sequelize.close();
};

exports.create = function (data, callback) {
    var itemAttach = UserLesson.build(data);
    itemAttach.save().then(function (row) {
        callback(null, row);
    }).catch(function (err) {
        callback(err, null);
    })
};

exports.findAll = function (callback) {
    UserLesson.findAll({
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
    UserLesson.findOne({
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
    UserLesson.findOne({
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