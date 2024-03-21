// On importe le package HTTP natif de Node pour créer un serveur
const http = require('http');

// On va importer notre app l'application Express depuis le fichier app.js dans le meme dossier
const app = require('./app');

// Récupère le port à partir de la variable d'environnement ou utilise le port 4000 par défaut
const port = normalizePort(process.env.PORT || '4000');

// on doit dire à l'application express sur quel port elle doit tourner avec la méthode app.set (on configure le port de l'application Expres)
app.set('port', port);

// Crée un serveur HTTP en lui demandant de lui passer cette app (l'application créee par Express) avec la méthode createServer du package http
const server = http.createServer(app);

// Notre server node est bien en train de retourner notre app express