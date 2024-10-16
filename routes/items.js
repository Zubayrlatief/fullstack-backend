const express = require('express')
const router = express.Router()
const Items = require('../models/items')

// Getting all items
router.get('/', async (req, res) => {
    try{
        const items = await Items.find()
    } catch(err){
        res.json({ message: err.message})
    }
})

//Getting single item
router.get('/:id', (req, res) => {
    res.send(req.params.id)
})

// Creating a item
router.post('/', (req, res) =>{

})

// Updating a item
router.patch('/', (req, res) =>{

})

// Deleting a item
router.delete('/', (req, res) =>{

}) 

module.exports = router