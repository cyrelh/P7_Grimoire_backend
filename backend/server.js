// On importe le package HTTP natif de Node pour créer un serveur
const http = require('http');

// On va importer notre app l'application Express depuis le fichier app.js dans le meme dossier
const app = require('./app');

//la fonction normalizePort (pour normaliser le port) renvoie un port valide ou faux, qu'il soit fourni sous la forme d'un numéro ou d'une chaîne
const normalizePort = (val) => {
	const port = parseInt(val, 10);

	if (isNaN(port)) {
		return val;
	}
	if (port >= 0) {
		return port;
	}
	return false;
};

// On récupère le port à partir de la variable d'environnement ou utilise le port 4000 par défaut
const port = normalizePort(process.env.PORT || '4000');

// on doit dire à l'application express sur quel port elle doit tourner avec la méthode app.set (on configure le port de l'application Expres)
app.set('port', port);

//la fonction errorHandler  recherche les différentes erreurs et les gère de manière appropriée lors de la création du serveur
//Elle est ensuite enregistrée dans le serveur

const errorHandler = (error) => {
	if (error.syscall !== 'listen') {
		throw error;
	}
	const address = server.address();
	const bind =
		typeof address === 'string' ? 'pipe ' + address : 'port: ' + port;
	switch (error.code) {
		case 'EACCES':
			console.error(bind + ' requires elevated privileges.');
			process.exit(1);
			break;
		case 'EADDRINUSE':
			console.error(bind + ' is already in use.');
			process.exit(1);
			break;
		default:
			throw error;
	}
};

// On crée un serveur HTTP en lui demandant de lui passer cette app (l'application créee par Express) 
// avec la méthode createServer du package http
const server = http.createServer(app);

// Et donc c'est ici qu'on gère les erreurs lors de la création du serveur
server.on('error', errorHandler);

// Écouteur d'événements "listening" du serveur est enregistré 
// consignant le port ou le canal nommé sur lequel le serveur s'exécute dans la console
server.on('listening', () => {
	const address = server.address();
	const bind = typeof address === 'string' ? 'pipe ' + address : 'port ' + port;
	console.log('Listening on ' + bind);
});

// Puis on effectue l'écoute du serveur sur le port défini
server.listen(port);


// Notre server node est bien en train de retourner notre app express
//Configuration et création du serveur HTTP en utilisant Node.js et Express réalisées
// Port correctement configurée par fonction normalizePort
// errorHandler fournit une gestion des erreurs pour éviter les problèmes potentiels lors du démarrage du serveur