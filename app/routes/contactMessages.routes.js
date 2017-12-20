const router = require('express').Router()
const contactMessagesController = require('../controllers/contactMessages.controller')
const validateBody = require('../filters/validate.body')
const ContactMessage = require('../models/contactMessage')

module.exports = router

// api routes ===========================================================
router.get('/', contactMessagesController.readAll)
router.get('/:id([0-9a-fA-F]{24})', contactMessagesController.readById)
router.post('/', validateBody(ContactMessage), contactMessagesController.create)
router.put('/:id([0-9a-fA-F]{24})', validateBody(ContactMessage), contactMessagesController.update)
router.delete('/:id([0-9a-fA-F]{24})', contactMessagesController.delete)