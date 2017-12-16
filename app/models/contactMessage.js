const Joi = require('joi')
Joi.objectId = require('joi-objectid')(Joi)

const schema = {
    _id: Joi.objectId(),
    name: Joi.string(),
    message: Joi.string(),
    email: Joi.string().email(),
    phoneNumber: Joi.string().regex(/^(\([0-9]{3}\) |[0-9]{3}-)[0-9]{3}-[0-9]{4}$/)
}

module.exports = Joi.object().keys(schema)