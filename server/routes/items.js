//  express route to get one item by ID.
const express = require('express');
const router = express.Router();
const Item = require('../models/item');

router.get('/:id', async (req, res) => {
  const itemId = req.params.id;
  try {
    const item = await Item.findByPk(itemId);
    if (item) {
      res.status(200).json(item);
    } else {
      res.status(404).json({ message: 'Item not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
})

router.post('/', async (req, res) => {
    const { name, description, price, category, image } = req.body;
    try {
      const newItem = await Item.create({ name, description, price, category, image });
      res.status(201).json(newItem);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  })

  // update item thingy.
router.put('/:id', async (req, res) => {
    const itemId = req.params.id;
    const { name, description, price, category, image } = req.body;
    try {
      const item = await Item.findByPk(itemId);
      if (item) {
        item.name = name;
        item.description = description;
        item.price = price;
        item.category = category;
        item.image = image;
        await item.save();
        res.status(200).json(item);
      } else {
        res.status(404).json({ message: 'Item not found' });
      }
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  })




module.exports = router;
