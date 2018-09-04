const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');


const category = require('../../models/Category');
const secret = require('../../config/keys').secret;

router.get('/', async (req, res) =>{
    try{
        let categories = await category.find().sort({catName: 1});
        res.status(200).send(categories);
    }
    catch(err){
        return res.status(500).send(err)
    }

});

router.post('/', verifyToken, (req, res) => {
    
    jwt.verify(req.token, secret, (err, data) => {
        if(err)
            return res.status(403).send({msg: "Erreur!", err});
            
        category.create({ catName: req.body.catName, img: req.body.img }, (err, resp)=> {
            if(err) 
                return res.status(500).send("Erreur lors de l'enregistrement de l'annonce");
            
            return res.status(200).send({resp, data});
        });
    });

});

router.delete('/:id', verifyToken, (req, res) => {
    jwt.verify(req.token, secret, (err, data) => {
        if(err)
            return res.status(403).send("Erreur de verification de l'authentification");
        
        category.remove({_id: req.params._id}, (error, response) => {
            if(error)
                return res.status(403).send("Erreur l'or de la suppression");
            
            return res.status(200).send({msg:"La catégorie est supprimée avec succès."});
        });

    });
});

function verifyToken(req, res, next) {
    // Get auth header value

    console.log(req);
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