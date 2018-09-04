const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const secret = require('../../config/keys').secret;
const Offer = require('../../models/Offer');
const mongoose = require('mongoose');


router.post('/', verifyToken, (req, res) => {
    jwt.verify(req.token, secret, (err, data) => {
        if(err) 
            return res.status(500).send(err);
        
        
        Offer.create({
            message: req.body.message,
            prix: req.body.prix,
            user: req.body.user,
            annonce: req.body.annonce
        }, (error, resp) => {
            if(error)
               return res.status(500).send("Erreur de créer l'offre: " + error);
            
            res.status(200).send(resp);

        });
    });

});

router.get('/:id', (req, res) => {

    const id = mongoose.Types.ObjectId(req.params.id);

    Offer.aggregate([
        {
            $match: {annonce: id },
        },
        {
            $lookup: {
                from: 'users',
                localField: 'user',
                foreignField: '_id',
                as: 'user'
            },
        },
        {
            $project: {
                "prix": 1,
                "message": 1,
                'annonce': '1',
                'date': 1,
                'user._id': 1,
                'user.nom': 1,
                'user.prenom': 1,
                'user.email': 1,
                'prix': 1

            }
        }

    ], (err, offers) => {
        if(err)
            return res.status(500).send(err)

        return res.status(200).send(offers);
    })
});

function verifyToken(req, res, next) {
    // Get auth header value

    const bearerHeader = req.headers['authorization'];
    // Check if bearer is undefined
    if(typeof bearerHeader !== 'undefined') {
      
      const bearer = bearerHeader.split(' ');
      
      const bearerToken = bearer[1];
      // Set the token
      req.token = bearerToken;
      // Next middleware
      next();
    } else {
      // Forbidden
      res.sendStatus(403);
    }
  
  }

  module.exports = router;