// Importe le  le package HTTP natif de Node pour créer un serveur
const http = require('http');


// Crée un serveur HTTP en utilisant l'application Express avec la méthode createServer du package http
const server = http.createServer(app);