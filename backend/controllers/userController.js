//package de cryptage pour les mdp
const bcrypt = require('bcrypt'); 

// Import du modèle userSchema car on va enregistrer et lire des users dans les 2 middleware signup et login
const userSchema = require('../models/userSchema');

// Fonction logique métier signup pour l'inscription utilisateur
exports.signup = (req, res, next) => {
    	// Appel de la fonction pour hasher mdp
	bcrypt.hash(req.body.password, 10) // on lui passe mdp corps de la requête qui sera passée par le frontend
    //salt :nb de fois qu'on execute de l'algo de hashing --> ici 10 tours suffit pour mdp secured (+tours algo + tps)
    // Méthode async pour recup le hash de mdp puis l'enregistrer dans un nouveau user crée danss la db
    .then((hash) => {
        // Création du nouvel utilisateur avec notre modèle mongoose User
        const user = new User({
            // Adresse mail fournie dans corps de la requête
            email: req.body.email,
            // on va enregistrer le hash en argument audessus pour pas stocker un mdp en blanc
            password: hash
        });
        // Enregistrement du User dans la db
        user.save()
            // Si l'enregistrement est réussi on renvoie un code 201(= ressource crée) et un message
            .then(() => res.status(201).json({ message: 'Utilisateur créé !' }))
            // Si l'enregistrement à échoué on renvoie une erreur 400 avec l'obj error pour différencier du catch en bas
            .catch((error) => res.status(400).json({ error }));
    })
    // Erreur serveur
    .catch((error) => res.status(500).json({ error }));

};

// Fonction logique métier login pour la connexion utilisateur
exports.login = (req, res, next) => {

};