const express = require('express');
const { check, validationResult } = require('express-validator');
const House = require('../models/House');
const router = express.Router();

const validate = [
  check('title').isLength({ min: 3, max: 20 }).withMessage('Title should be between 3 to 50 characters'),
  check('description')
    .isLength({ min: 10, max: 200 })
    .withMessage('Description should be between 10 to 200 characters'),
  check('address').isLength({ min: 10, max: 200 }).withMessage('Address should be between 10 to 200 characters'),
  check('price').isNumeric().withMessage('Price should be a number'),
];

router.post('/', validate, (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).send({ error: errors.array() });
  }
  const { title, address, homeType, description, price, image, yearBuilt } = req.body;
  const house = new House({
    title,
    address,
    homeType,
    description,
    price,
    image,
    yearBuilt,
  });
  house
    .save()
    .then((result) =>
      res.send({
        message: 'House data created successfully',
        data: result,
      })
    )
    .catch((err) => console.log(err));
});

router.get('/', (req, res) => {
  House.find()
    .then((houses) => {
      res.send(houses);
    })
    .catch((err) => console.log(err));
});

router.get('/:id', (req, res) => {
  House.findById(req.params.id)
    .then((house) => {
      res.send(house);
    })
    .catch((err) => console.log(err));
});

router.put('/:id', validate, (req, res) => {
  if (!errors.isEmpty()) {
    return res.status(422).send({ error: errors.array() });
  }
  House.findById(req.params.id)
    .then((house) => {
      const { title, address, homeType, description, price, image, yearBuilt } = req.body;
      house.title = title;
      house.address = address;
      house.homeType = homeType;
      house.description = description;
      house.price = price;
      house.image = image;
      house.yearBuilt = yearBuilt;
      return house.save();
    })
    .then((result) => {
      res.send(result);
    })
    .catch((err) => console.log(err));
});

router.delete('/:id', (req, res) => {
  House.findByIdAndRemove(req.params.id)
    .then((result) => {
      res.send(result);
    })
    .catch((err) => console.log(err));
});

module.exports = router;
