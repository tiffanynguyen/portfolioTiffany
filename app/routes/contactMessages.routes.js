const router = require('express').Router()
const contactMessagesController = require('../controllers/contactMessages.controller')
const validateBody = require('../filters/validate.body')
const ContactMessage = require('../models/contactMessage')

module.exports = router

// api routes ===========================================================
router.get('/', contactMessagesController.readAll)
router.post('/', validateBody(ContactMessage), contactMessagesController.create)