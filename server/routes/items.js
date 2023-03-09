//  express route to get one item by ID.
const express = require('express');
const {check, validationResult} = require("express-validator");
const router = express.Router();
const {Item} = require('../models/index');

router.get('/', async (req, res) => {
  try {
    const item = await Item.findAll();
    if (item) {
      res.status(200).json(item);
    } else {
      res.status(404).json({ message: 'Items not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
})

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

router.post('/',[check("title").not().isEmpty().trim(),check("price").not().isEmpty().trim(),check("category").not().isEmpty().trim()], async (req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()){
      res.status(400).json({errors})
    }else{
      const { title, description, price, category, image } = req.body;
      try {
        const newItem = await Item.create({ title, description, price, category, image });
        res.status(201).json(newItem);
      } catch (error) {
        res.status(400).json({ message: error.message });
      }
    }
  })

  // update item thingy.
router.put('/:id', [check("title").not().isEmpty().trim(),check("price").not().isEmpty().trim(),check("category").not().isEmpty().trim()],async (req, res) => {
  const errors = validationResult(req)
    if (!errors.isEmpty()){
      res.status(400).json({errors})
    }else{
      const itemId = req.params.id;
      const { title, description, price, category, image } = req.body;
      try {
        const item = await Item.findByPk(itemId);
        if (item) {
          item.title = title;
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
    }
  })

  router.delete('/:id', async (req, res) => {
    try {
      const item = await Item.destroy({where: {id: req.params.id}})
      if (item) {
        res.status(200).json(await Item.findAll());
      } else {
        res.status(404).json({ message: 'Item not found' });
      }
    } catch (error) {
      res.status(400).json({ message: error.message})
    }
})




module.exports = router;