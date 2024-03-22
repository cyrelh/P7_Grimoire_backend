// importation de jwt
const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => { // on va exporter une fct qui sera notre middleware
			// Récupération du token composé de 2 parties qs encoyé par client, le Bearer puis le token
    try {
        // on récup le headers en le splitant 
        //(divisant la chaine de caractere en 1 tableau autour de l'espace se trouvant entre mots clés Bearer et le token)
        // et c'est bien le token en 2e qu'on veut récup
		const token = req.headers.authorization.split(' ')[1];
		// 1 fois qu'on a le token, il faut le décoder via METHODE .verify de jwt en lui passant le token récupéré et la clé secrète
		const decodedToken = jwt.verify(token, 'RANDOM_TOKEN_SECRET');
		// Récupération du userId en le récupérant via le token décodé
		const userId = decodedToken.userId;
		// On transmet le userId à l'objet req. qui sera transmis aux routes transmises par la suite ou aux autres middlewares
		req.auth = {userId: userId};
		next();
		// Si le token n'est pas décodé une erreur sera renvoyée grâce au catch qui indiquera au client que son token est invalide
	} catch (error) {
		res.status(401).json({ error });
	}
};
