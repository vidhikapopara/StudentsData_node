const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const User = require('../model/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Otp = require('../model/user');
const await = require('await');
const response = require('response');
const hash = require('bcrypt');
const { replaceOne } = require('../model/user');
const replace = require('replace');

router.post('/signup', (req, res, next) => {
    bcrypt.hash(req.body.password, 10, (err, hash) => {
        if (err) {
            return res.status(500).json({
                error: err
            })
        }
        else {
            const user = new User({
                _id: new mongoose.Types.ObjectId,
                username: req.body.username,
                email: req.body.email,
                phone: req.body.phone,
                password: hash, 
                gender: req.body.gender,
                age: req.body.age,
            })

            user.save()
                .then(result => {
                    res.status(200).json({
                        new_user: result
                    })
                })
                .catch(err => {
                    res.status(500).json({
                        error: err
                    })
                })
        }
    })
}
)



router.post('/login', (req, res, next) => {
    User.find({ email: req.body.email })

        .exec()
        .then(user => {
            if (user.length < 1) {
                return res.status(401).json({
                    msg: 'user not found'
                })
            }
            bcrypt.compare(req.body.password , user[0].password, (err, result) => {
                if (!result) {
                    return res.status(401).json({
                        msg: 'password matching fail'
                    })
                }
                if (result) {
                    const token = jwt.sign({
                        username: user[0].username,
                        gender: user[0].gender,
                        email: user[0].email,
                        phone: user[0].phone,
                        age: user[0].age
                    },
                        'this is data',
                        {
                            expiresIn: '30d'
                        }
                    );
                    res.status(200).json({
                        username: user[0].username,
                        gender: user[0].gender,
                        age: user[0].age,
                        email: user[0].email,
                        phone: user[0].phone,
                        token: token
                    })
                }
            }) 
        })

        .catch(err => {
            res.status(500).json({
                err: err
            })
        })
})








router.post('/forget', async (req, res, next) => {
    var user = await User.findOneAndUpdate({ email: req.body.email }, { $set: { password: req.body.newpassword } })
    .lean().exec((err, docs) => {
        console.log(">>>>>>>>>", docs);
    })

    bcrypt.hash(req.body.newpassword, 10, (err, hash) => {
        if (err) {
            return res.status(500).json({
                error: err
            })
        }        
            try { 
                    return res.status(200).json({
                        msg: 'password change successfuly'
                    })
            
                } catch (error) {
                    return res.status(500).json({
                        error : error
                    })
                }
                })
        }
        )
    
module.exports = router;