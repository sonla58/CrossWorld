var Sequelize = require('sequelize');
var db = require('../config/database.js');
var sequelize = new Sequelize(db.database, db.user, db.password, db);

var ChatMessage = undefined;
module.exports.connect = function (callback) {
    ChatMessage = sequelize.define('ChatMessage', {
        chat_message_id: {
            type: Sequelize.INTEGER,
            primaryKey: true
        },
        chat_id: {
            type: Sequelize.INTEGER,
            allowNull: false
        },
        user_id: {
            type: Sequelize.STRING,
            allowNull: false
        },
        message: {
            type: Sequelize.STRING,
        },
        image: {
        	type: Sequelize.STRING,
        },
        delected: {
        	type: Sequelize.BOOLEAN
        },
        create_at: {
        	type: Sequelize.DATE
        }
    }, {
        timestamps: false,
        createAt: false,
        updateAt: false,
        tableName: 'chat_message'
    });
};

exports.disconnect = function (callback) {
    sequelize.close();
};

exports.create = function (data, callback) {
    var itemAttach = ChatMessage.build(data);
    itemAttach.save().then(function (row) {
        callback(null, row);
    }).catch(function (err) {
        callback(err, null);
    })
};

exports.findByPhone = function (phone, callback) {
    ChatMessage.findOne({
        where: {phone_number: phone}
    }).then(function (row) {
        if (row) {
            callback(null, row);
        } else {
            callback(null, null);
        }
    }).catch(function (err) {
        if (err) callback(err, null);
    })
};

exports.findAll = function (callback) {
    ChatMessage.findAll({
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
    Customer.findOne({
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

exports.findByEmail = function (e, callback) {
    if(e == '' || e == null) {
        callback(null, null);
    } else {
        Customer.findOne({
        where: {
            email: e}
        }).then(function (row) {
            if (row) {
                callback(null, row);
            } else {
                callback(null, null);
            }
        }).catch(function (err) {
            if (err) callback(err, null);
        })
    }
};

exports.update = function (data, callback) {
    ChatMessage.findOne({
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
    ChatMessage.findOne({
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
            var itemAttach = ChatMessage.build(data);
            itemAttach.save().then(function (row) {

            }).error(function (error) {
                console.log(error);
            })
        }    

    }).catch(function (error) {
        console.log(error);
    })
};