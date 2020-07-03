//Appl de la library express framework
const express = require('express');
const bodyParser = require('body-parser');
//Utilsation du framework express via app
const app = express();


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

app.post('/api/stuff',(req,res,next)=>{
    console.log(req.body);
    res.status(201).json({
        message:'Objet crée !'
    });
});
//Premiere route pour notre api
app.use('/api/stuff',(req,res,next)=>{
    const stuff = [
        {
            _id: 'oeihzeoi',
            title:'Mon premier objet',
            description: 'les info de mon premier objet',
            imageUrl: 'https://cdn.pixabay.com/photo/2019/06/11/18/56/camera-4267692_1280.jpg',
            price: 4900,
            userId: 'qsomihvqios',
        },
        {
            _id: 'oeihfzeomoihi',
            title:'Mon deuxieme objet',
            description: 'Les infos de mon deuxième objet',
            imageUrl: 'https://cdn.pixabay.com/photo/2019/06/11/18/56/camera-4267692_1280.jpg',
            price: 2900,
            userId: 'qsomihvqios',
        }
    ];
    //Reponse renvoyer avec les fata
    res.status(200).json(stuff);
});
//Export du module app
module.exports = app;
