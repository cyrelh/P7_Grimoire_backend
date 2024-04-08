// importation de jsonwebtoken
const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => { // on va exporter une fct qui sera notre middleware
    try {
		//On extrait le token JWT du Headers Authorization de la requête HTTP
		//La méthode split(' ') divise la chaîne autour de l'espace et récupère le token qui est la deuxième partie (index 1) du tableau résultant
		const token = req.headers.authorization.split(' ')[1];
		// 1 fois qu'on a le token, il faut le vérifier et le décoder via METHODE .verify (du module jsonwebtoken) en lui passant le token récupéré et la clé secrète
		const decodedToken = jwt.verify(token, 'RANDOM_TOKEN_SECRET');
		// Récupération du userId en le récupérant via le token décodé
		const userId = decodedToken.userId;
		// On transmet le userId à l'objet req. ce qui le rend disponible et sera transmis pour les autres middlewares ou routes
		req.auth = {userId: userId};
		next(); //passe le contrôle au prochain middleware dans la chaîne de middleware Express
	} catch (error) { 
		res.status(401).json({ error }); //	// Si le token n'est pas décodé une erreur sera renvoyée grâce au catch qui indiquera au client que son token est invalide
	}
};
