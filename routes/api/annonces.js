const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const secret = require('../../config/keys').secret;
const Annonce = require('../../models/Annonce');
const multer = require('multer');
const mongoose = require('mongoose');



var storage = multer.diskStorage({

    destination: function (req, file, callback) {

        callback(null, './public/uploads/');

    },

    filename: function (req, file, callback) {

        if (!file.originalname.match(/\.(jpg|png|JPEG)$/)) {

            var err = new Error();

            err.code = 'filetype';

            return callback(err);

        } else {

            callback(null, Date.now() + file.originalname);
        }
    }
});

var upload = multer({ storage: storage, limits: { fileSize: 1000000 } }).array('images');

router.post('/', verifyToken, (req, res) => {
    jwt.verify(req.token, secret, (err, data) => {
        
        if(err)
            return res.status(403).send("Erreur de l'authentification");
            
            upload(req, res, function (err) {

                if (err) return res.status(500).send("ERROR!: " + err);
                const annonce = JSON.parse(req.body.annonce);
                
                Annonce.create({
                    titre: annonce.titre,
                    description: annonce.description,
                    date: annonce.date,
                    images: req.files.map(file => file.filename),
                    category: annonce.category,
                    user: annonce.user
        
                },(error, annonce) => {
                    if(error)
                        return res.status(403).send(error);
                        
                    
                    return res.status(200).send(annonce);
                  }
                );
            });
    });

});

router.get('/', (req, res) => {
    
    Annonce.aggregate([{
        $lookup: {
            from: 'users',
            localField: 'user',
            foreignField: '_id',
            as: 'user'
        }
    },
    {
        $project: {
            "_id": 1,
            "titre": 1,
            "description": 1,
            "images": 1,
            "date": 1,
            "user._id": 1,
            "user.nom": 1,
            "user.prenom": 1,
            "user.email": 1
        }
    }
    ]).sort({date: -1}).exec((err, resp) => {
        res.status(200).send({annonces: resp});
    });
});
router.get('/:cat', async (req, res) => {
    const cat = req.params.cat ? {category: mongoose.Types.ObjectId(req.params.cat)} : {};
    
    try{
        let annonces = await Annonce.aggregate([
        {
            $match: cat
        },
        {
            $lookup: {
                from: 'users',
                localField: 'user',
                foreignField: '_id',
                as: 'user'
            }
        },
        {
            $project: {
                "_id": 1,
                "titre": 1,
                "description": 1,
                "images": 1,
                "date": 1,
                "user._id": 1,
                "user.nom": 1,
                "user.prenom": 1,
                "user.email": 1
            }
        }
        ]).sort({date: -1});
        return res.status(200).send({annonces: annonces});
    }
    catch(err){
        return res.status(500).send(err);
    }
});

router.get('/show/:id', (req, res) => {
    
    Annonce.findOne({ _id : req.params.id })
            .populate('user', 'nom prenom email')
            .populate('category')
            .exec(function(err, annonce){
                if(err)
                    return res.status(500).send("There was an error" + err);
                    
                return res.status(200).send(annonce);
            });
});

router.delete('/:id', (req, res) => {
    Annonce.remove({_id: req.params.id}, (err, resp) =>{

    });
});

router.post('/like/:id', (req, res) => {
    const id = mongoose.Types.ObjectId(req.params.id);
    

    Annonce.update(
        {_id: id},
        { $push : { likes: req.body.id}},
            (err, resp)=> {
                if(err)
                    return res.status(500).send({liked: false, error: err});
                    
                    Annonce.findOne({ _id: id })
                    .populate('user', 'nom prenom email')
                    .populate('category')
                    .exec(function(err, annonce){
                        if(err)
                            return res.status(500).send({ liked: false, msg: err});
                            
                        
                        return res.status(200).send({liked: true, annonce});
                    });
            }
    )
});

router.post('/unlike/:id', (req, res) => {
    const id = mongoose.Types.ObjectId(req.params.id);

    Annonce.update(
        {_id: req.params.id},
        { $pull: { likes: req.body.id}},
        (err, resp) => {
            if(err) return res.status(500).send({unliked: false, error: err});
            
            Annonce.findOne({ _id: id })
            .populate('user', 'nom prenom email')
            .populate('category')
            .exec(function(err, annonce){
                if(err)
                    return res.status(500).send({ unliked: false, msg: err});
                    
                
                return res.status(200).send({unliked: true, annonce});
            });
        }
    )
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