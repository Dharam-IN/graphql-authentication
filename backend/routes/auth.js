const express = require('express');
const User = require('../models/User')
const router = express.Router();
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const JWT_SECRET = 'Dharamisagoodb$oy'

// create a user using: POST "/api/auth/createuser". No login Required
router.post('/createuser',[
    body('name', 'Enter a valid name').isLength({ min: 3 }),
    body('email', 'Enter a valid email').isEmail(),
    body('password').isLength({ min: 5 }),
], async (req, res)=>{
    // if there are error return bad request and the error
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

router.get('/users')
    // check whether the user with this email already exits
    try {
        let user = await User.findOne({email: req.body.email})
        if(user){
            return res.status(400).json({error: "Sorry a user with this email already exits"})
        }

        const salt = await bcrypt.genSalt(10);
        const secPass = await bcrypt.hash(req.body.password, salt)
        user = await User.create({
            name: req.body.name,
            password: secPass,
            email: req.body.email,
        })
        const data = {
            user:{
                id: user.id
            }
        }
        const JwtData = jwt.sign(data, JWT_SECRET)
        console.log(JwtData)
        // res.json(user)
        const authtoken = jwt.sign(data, JWT_SECRET);
        res.json({authtoken})
    } catch (error) {
        console.error(error.message)
        res.status(500).send("some error occured")
    }
})

module.exports = router
