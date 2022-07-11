
const express = require('express');
const app = express();

app.use(express.json());

const { body, validationResult } = require('express-validator');

app.post(
  '/user',
  body('first_name').isLength({min: 1}),
  body('last_name').isLength({min: 1}),
  body('email').isEmail(),
  body('pincode').isLength({min: 6}),
  body('age').isNumeric({min:1,max:100}),
  body('gender').isIn(["Male", "Female", "Other"]),
  (req, res) => {
    // Finds the validation errors in this request and wraps them in an object with handy functions
    const errors = validationResult(req);
    console.log(req.body)
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
   res.send("valid input registered...")
    
  },
);

app.listen(3000);