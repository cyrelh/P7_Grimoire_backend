//package de cryptage pour les mdp
const bcrypt = require('bcrypt'); 
//package pour créer et vérifier les tokens d'authentification
const jwt = require('jsonwebtoken');
// Import du modèle userSchema car on va enregistrer et lire des users dans les 2 middleware signup et login
const userSchema = require('../models/userSchema');

// Fonction logique métier signup pour l'inscription utilisateur
exports.signup = (req, res, next) => {
    	// Appel de la fonction pour hasher mdp
	bcrypt.hash(req.body.password, 10) // on lui passe mdp corps de la requête qui sera passée par le frontend
    //execute de l'algo de hashing --> ici 10 tours suffit pour mdp secured (+tours algo + tps)
    // Méthode async pour recup le hash de mdp puis l'enregistrer dans un nouveau user crée danss la db
    .then((hash) => {
        // Création du nouvel utilisateur avec notre modèle mongoose userSchema
        const user = new userSchema({
            // Adresse mail fournie dans corps de la requête
            email: req.body.email,
            // on va enregistrer le hash en argument audessus pour pas stocker un mdp en blanc
            password: hash
        });
        // Enregistrement du user dans la db
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
    userSchema.findOne({ email: req.body.email }) // on utilise la méthode findOne et on lui passe un objet qui va servir de sélecteur
    // ctd servir de sélecteur avec unchamp email et la valeur qui nous a été transmise par le client

    // il faut gérer 2 cas car c'est une promesse retournée par findOne
		.then((user) => { // cas qd la méthode réussie
			// On vérifie si l'utilisateur a été trouvé
			if (user === null) {
				// Erreur retourné si l'utilisateur n'existe pas
				res.status(401).json({ message: 'Paire identifiant/mot de passe incorrecte' });
				
			} else { // sinon s'il y a une valeur et donc dans le cas où l'utilisateur existe (est enregistré dans notre db)
				// Appel de la méthode compare de bcrypt pour récupérer le mdp de la db et celui saisi par l'utilisateur
				bcrypt
					.compare(req.body.password, user.password)
                     //Méthode compare de bcrypt - on compare ce qui a été transmis par notre frontend client et ensuite notre mdp de la db
					.then((valid) => {
						// On vérifie si le mdp est faux
						if (!valid) {
							// On retourne un message d'erreur si le mdp saisi est incorrect
							res.status(401).json({ message: 'Paire identifiant/mot de passe incorrecte' });
							// Dans le cas ou l'utilisateur saisi le bon mdp
						} else {
							// On retourne l'objet User contenant les infos à l'authentification des req émises par le client 
                            //CEUX du userId + le token
							res.status(200).json({                                
                                userId: user._id,
                                // Appel de la fonction .sign() de jwt pour encoder un Token, elle prend 3 arguments
                                token: jwt.sign( 
									// 1er argument : données que l'on veut encoder à l'intérieur de token (payload)
                                    // Création obj avec le userId qui sera l'identifiant utilisateur du User
									// Comme ça on est sûr que cette req est bien celle de userId au-dessus
									{ userId: user._id },
									// 2e argument c'est la clé secrète d'encodage
									'RANDOM_TOKEN_SECRET',
									// 3e argument (de configuration) où on applique expiration pour le token de 24h'
									{ expiresIn: '24h' } // au dela de 24h, le token sera plus valable
								),
							});
						}
					})
					// Vérification erreur exécution de la requête dans la db et non pas si l'utilisateur existe
					.catch((error) => { // cas qd il y a une erreur serveur (de traitement)
						res.status(500).json({ error });
					});
			}
		})
		// Vérification erreur exécution de la requête dans la db et non pas si l'utilisateur existe
		.catch((error) => {
			res.status(500).json({ error });
		});
};

// userSchema.deleteMany({}).then(() => {
//         console.log('Supression de tous les users dans la Database')
//       });