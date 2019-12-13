const express = require('express');
const mongoose = require('mongoose');
const body = require('body-parser')
let app = express(); // création de l'objet représentant notre application express
let port = 8080;

const Site = require('./site');

// Connection a la base de donnée ici un Cluster Atlas Mongodb. 
//Toute autre façon se connecter à une BDD Mongodb sera semsiblement similaire
mongoose.connect('mongodb+srv://User:Password@ClusterAddress/BbName?retryWrites=true&w=majority', {
  useNewUrlParser: true,
  useUnifiedTopology: true 
});

app.use(body())

// Dans notre exemple nous créons une API qui liste différentes adresse de site internet
// Le JSON renvera donc la Clé "url" et une valeur donnée sous forme de chaine de caractère. 


app.get('/', async (req, res) => {
    const url = await Site.find() // On récupère tout les adresses
    await res.json(url)
})


app.post('/', async (req, res) => {
    const url = req.body.url; // récupération des variables du body
 
    if (!url) { // on vérifie qu'il y a notre variable
        res.send('Il manque un argument')
        return
    }
 
    const nouveau_site = new Site({ // création d'un objet représentant notre nouveau Site internet
        url : url,
    })
     
    await nouveau_site.save() // sauvegarde asynchrone du nouveau Site
    res.json(nouveau_site)
    return
 
})

app.get('/:id', async (req, res) => {
    const id = req.params.id // on récupère la valeure dans l'url
    const site = await Site.findOne({_id : id}) // on récupère le site grâce à son _id
    res.json(site)
})

app.delete('/:id', async(req, res) => {
    const id = req.params.id
    const suppr = await Site.deleteOne({_id : id})
    res.json(suppr)
     
})
 
app.listen(port, () =>  { // écoute du serveur sur le port 8080
    console.log('le serveur fonctionne')
})