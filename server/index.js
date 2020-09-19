const express = require('express');
const mongoose = require('mongoose');
const houses = require('./routes/houses');
const app = express();

app.use(express.json());
require('dotenv').config();

app.get('/', (req, res) => {
  res.send('Welcome to the house listings api');
});

app.use('/api/houses', houses);

const port = process.env.PORT || 3000;
mongoose
  .connect(process.env.MONGO_STRING, { useUnifiedTopology: true, useNewUrlParser: true })
  .then((result) => {
    app.listen(port, () => console.log(`Listening on port ${port}`));
  })
  .catch((err) => console.log(err));

// app.get('/', (req, res) => {
//   res.send('Welcome to Express');
// });

// app.get('/api/listing', (req, res) => {
//   res.send(homes);
// });

// app.get(`/api/listing/:id`, (req, res) => {
//   const id = req.params.id;
//   const home = homes.find((home) => home.id === parseInt(id));
//   if (!home) {
//     res.status(404).send('The home with the given ID cannot be found');
//   }
//   res.send(home);
// });

// app.post('/api/listing', (req, res) => {
//   const home = {
//     id: homes.length + 1,
//     type: req.body.type,
//     description: req.body.description,
//   };
//   homes.push(home);
//   res.send(home);
// });

// app.put('/api/listing/:id', (req, res) => {
//   const home = homes.find((home) => home.id === parseInt(req.params.id));
//   if (!home) {
//     return res.status(404).send('the home with the given ID is not found');
//   }
//   home.type = req.body.type;
//   home.description = req.body.description;
//   res.send(home);
// });

// app.delete('/api/listing/:id', (req, res) => {
//   const home = homes.find((home) => home.id === parseInt(req.params.id));
//   if (!home) {
//     return res.status(404).send('the home with the given ID is not found');
//   }
//   const index = homes.indexOf(home);
//   homes.splice(index, 1);
//   res.send(home);
// });
