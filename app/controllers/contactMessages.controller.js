const responses = require('../models/responses')
const contactMessagesService = require('../services/contactMessages.service')
const apiPrefix = '/api/contactMessages';

module.exports = {
    readAll: readAll,
    readById: readById,
    create: create,
    update: update,
    delete: _delete
}

function readAll(req, res) {
    contactMessagesService.readAll()
        .then(contactMessages => {
            const responseModel = new responses.ItemsResponse()
            responseModel.items = contactMessages
            res.json(responseModel)
        })
        .catch(err => {
            console.log(err)
            res.status(500).send(new responses.ErrorResponse(err))
        })
}

function create(req, res) {
    contactMessagesService.create(req.model)
        .then(id => {
            const responseModel = new responses.ItemsResponse()
            responseModel.item = id
            res.status(201)
                .location(`${apiPrefix}/${id}`)
                .json(responseModel)
        })
        .catch(err => {
            console.log(err)
            res.status(500).send(new responses.ErrorResponse(err))
        })
}

function readById(req, res) {
    contactMessagesService.readById(req.params.id)
        .then(contactMessage => {
            const responseModel = new responses.ItemResponse()
            responseModel.item = contactMessage
            res.json(responseModel)
        })
        .catch(err => {
            console.log(err)
            res.status(500).send(new responses.ErrorResponse(err))
        })
}


function update(req, res) {
    contactMessagesService
        .updateOne(req.params.id, req.model)
        .then(contactMessage => {
            const responseModel = new responses.SuccessResponse()
            res.status(200).json(responseModel)
        })
        .catch(err => {
            console.log(err)
            res.status(500).send(new responses.ErrorResponse(err))
        })
}

function _delete(req, res) {
    contactMessagesService
        .deactivate(req.params.id)
        .then(() => {
            const responseModel = new responses.SuccessResponse()
            res.status(200).json(responseModel)
        })
        .catch(err => {
            console.log(err)
            return res.status(500).send(new responses.ErrorResponse(err))
        })
    }