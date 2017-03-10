var Sequelize = require('sequelize');
var db = require('../config/database.js');
var sequelize = new Sequelize(db.database, db.user, db.password, db);

var Chat = undefined;
module.exports.connect = function (callback) {
    User = sequelize.define('Chat', {
        chat_id: {
            type: Sequelize.INTEGER,
            primaryKey: true
        },
        native: {
            type: Sequelize.STRING
        },
        foreign: {
            type: Sequelize.STRING
        },
        type: {
            type: Sequelize.BOOLEAN
        }
    }, {
        timestamps: false,
        createAt: false,
        updateAt: false,
        tableName: 'chat'
    });
};

exports.disconnect = function (callback) {
    sequelize.close();
};

exports.create = function (data, callback) {
    var itemAttach = Chat.build(data);
    itemAttach.save().then(function (row) {
        callback(null, row);
    }).catch(function (err) {
        callback(err, null);
    })
};

exports.findAll = function (callback) {
    Chat.findAll({
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
    Chat.findOne({
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
    Chat.findOne({
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

exports.updateOrCreate = function (data, callback) {
    Chat.findOne({
        where: {phone_number: data.phone_number}
    }).then(function (row) {
        if (row) {
            console.log("update");
            row.update(data).then(function (row) {

            }).error(function (error) {
                console.log(error);
            })
        } else {
            console.log("save");
            var itemAttach = Chat.build(data);
            itemAttach.save().then(function (row) {

            }).error(function (error) {
                console.log(error);
            })
        }    

    }).catch(function (error) {
        console.log(error);
    })
};