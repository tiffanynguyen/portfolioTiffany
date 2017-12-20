const ContactMessage = require('../models/contactMessage')
const mongodb = require('../mongodb')
const conn = mongodb.connection
const ObjectId = mongodb.ObjectId

module.exports = {
    readAll: readAll,
    create: create,
    readById: readById,
    update: update,
    deactivate: _deactivate

}

function readAll() {
    return conn.db().collection('contactMessages')
        .find()
        .toArray()
        .then(contactMessages => {
            for (let i = 0; i < contactMessages.length; i++) {
                let contactMessage = contactMessages[i]
                contactMessage._id = contactMessage._id.toString()
            }
            return contactMessages
        })
}

function readById(id) {
    return conn.db().collection('contactMessages').findOne({ _id: new ObjectId(id) })
        .then(contactMessage => {
            contactMessage._id = contactMessage._id.toString()
            return contactMessage
        })
}

function create(model) {
    let newModel = {
        _id: new ObjectId(model._id),
        dateModified: new Date(),
        dateCreated: new Date(),
        dateDeactivated: null,
        name: model.name,
        message: model.message,
        phoneNumber: model.phoneNumber,
        email: model.email
    }
    return conn.db().collection('contactMessages')
        .insert(newModel)
        .then(result => result.insertedIds[0].toString())
}

function update(id, doc) {
    let newDoc = {
        _id: new ObjectId(doc._id),
        dateModified: new Date(),
        name: doc.name,
        message: doc.message,
        phoneNumber: doc.phoneNumber,
        email: doc.email
    }
    return conn.db().collection('contactMessages').updateOne({ _id: new ObjectId(id) }, { $set: newDoc })
        .then(result => Promise.resolve())
}

function _deactivate(id) {
    return conn.db().collection('contactMessages').updateOne({ _id: new ObjectId(id) }, { $currentDate: { dateDeactivated: true } }, { $currentDate: { dateModified: true } })
        .then(result => Promise.resolve())
}