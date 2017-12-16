const ContactMessage = require('../models/contactMessage')
const mongodb = require('../mongodb')
const conn = mongodb.connection
const ObjectId = mongodb.ObjectId

module.exports = {
    readAll: readAll,
    create: create,
    readById: readById,
    update: update,
    delete: _deactivate

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
    return conn.db().collection('contactMessages')
        .insert(model)
        .then(result => result.insertedIds[0].toString())
}

function update(id, doc) {
    doc._id = new ObjectId(doc._id)
    return conn.db().collection('contactMessages').updateOne({ _id: new ObjectId(id) }, doc)
        .then(result => Promise.resolve())
}

function _deactivate(id) {
    return conn.db().collection('contactMessages').updateOne({ _id: new ObjectId(id) })
        .then(result => Promise.resolve())
}