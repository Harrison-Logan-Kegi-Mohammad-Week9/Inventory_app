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

module.exports = router;
