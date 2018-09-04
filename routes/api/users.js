const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const mongoose = require('mongoose');

const secret = require('../../config/keys').secret;

const User = require('../../models/User');

//Login a user
router.post('/login', (req, res) => {
    
    const email = req.body.email;
    const password = req.body.password;

    User.findOne({email: email}, (err, user) => {
        if(err)
            return res.status(500).send(err);
        
        if(!user)
            return res.status(404).send("User not found");
        
        const pwIsValid =  bcrypt.compareSync(password, user.password);
        if(!pwIsValid) 
            return res.status(401).send({auth: false, token: null});
        
        const token = jwt.sign({
                id: user._id,
                nom: user.nom,
                prenom: user.prenom,
                email: user.email
            },
            secret,
            { expiresIn: 100000 },
        );

        return res.status(200).send({auth: true, token});
    });
});

//Register a user
router.post('/register', (req, res) => {
    const hashedPassword = bcrypt.hashSync(req.body.password, 8);
    User.create({
        nom: req.body.nom,
        prenom: req.body.prenom,
        email: req.body.email,
        password: hashedPassword
    },
    (err, user) =>{
        if(err)
            return res.status(500).send('There was a problem registering the user.');
    
        const token = jwt.sign({id: user._id, nom: user.nom, prenom: user.prenom, email: user.email, notifications: []}, secret, {expiresIn: 200});
        return res.status(200).send({auth: true, token});
    });
});

router.post('/notify/:id', (req, res) => {
    const id = mongoose.Types.ObjectId(req.params.id);
    
    const notification = {
        message: req.body.message,
        lien: req.body.link,
        seen: false
    }
    

    
    User.update(
        { _id: id },
        { $push: { notifications: notification }},(err, resp) => {
            if(err)
                return res.status(500).send({notified: false, msg: err});
            
            const _wsHandler = req.app.get('_wsHandler');
            _wsHandler.sendNotification(req.params.id, notification);
            
            return res.status(200).send({notified: true});
    });
});

router.get('/:id/notifications', async (req, res) => {
    try{
        const notifications = await User.findById(req.params.id).select({"notifications": 1});
        
        return res.status(200).send({notifications: notifications.notifications});
    }
    catch(err){
        return res.status(500).send(err);
    }
});

module.exports = router;