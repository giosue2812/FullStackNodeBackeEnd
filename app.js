//Appl de la library express framework
const express = require('express');
const bodyParser = require('body-parser');
//Utilsation du framework express via app
const app = express();
//Import du package pour gerer la database mongodb
const mongoose = require('mongoose');
//Import du model de schema
const Thing = require('./models/Thing');

mongoose.connect('mongodb+srv://giosue:elisa2812@formationopenapinodejse.ubzce.mongodb.net/test?retryWrites=true&w=majority',
    {useNewUrlParser: true,
    useUnifiedTopology: true}).then(()=> console.log('Connexion a MongoDB réussie !')).catch(()=>console.log('Connexion a MongoDB échouée'));
// //Reponse qui indique que la requete est reçue puis passe a l'execution
// app.use((req,res,next)=>{
//     console.log('Requete reçue !');
//     next();
// });
// //Reponse 201, puis passe a l'execution
// app.use((req,res,next)=>{
//     res.status(201);
//     next();
// });
// //Reponse qui indique que la requete est reçue puis passe a l'execution
// app.use((req,res,next)=>{
//     res.json({message: 'Votre requête a bien été reçue !'});
//     next();
// });
// //Reponse envoyé
// app.use((req,res,next)=>{
//    console.log('Response envoyé avec succés');
// });

//Mise en place des cors
   app.use((req, res, next) => {
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
        res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
        next();
    });

app.use(bodyParser.json());
//Route pour enregistrer un nouveau opbjet
app.post('/api/stuff',(req,res,next)=>{
    delete req.body._id;
    const thing = new Thing({
        ...req.body
    });
    thing.save()
        .then(() => res.status(201).json({message: 'Objet enregisté !'}))
        .catch(error => res.status(400).json({error}));
});
//Route pour recuperer un objet specifique
app.get('/api/stuff/:id',(req,res,next)=> {
    Thing.findOne({_id: req.params.id})
        .then(thing => res.status(200).json(thing))
        .catch(error => res.status(404).json({error}));
});
//Route pour modifier un objet
app.put('/api/stuff/:id',(req,res,next)=> {
    Thing.updateOne({_id: req.params.id},{...req.body,_id: req.params.id})
        .then(() => res.status(200).json({message: 'Objet modifié'}))
        .catch(error => res.status(400).json({error}));
});

//Route pour delete un objet
app.delete('/api/stuff/:id',(req,res,next)=> {
    Thing.deleteOne({_id: req.params.id})
        .then(() => res.status(200).json({message: 'Objet supprimé !'}))
        .catch(error => res.status(400).json({error}));
});
//Premiere route pour notre api
app.use('/api/stuff',(req,res,next)=>{
    Thing.find()
        .then(things => res.status(200).json(things))
        .catch(error => res.status(400).json(error));
});
//Export du module app
module.exports = app;
