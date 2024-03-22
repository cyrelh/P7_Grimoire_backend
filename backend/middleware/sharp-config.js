const sharp = require("sharp"); // Importe le module Sharp pour le traitement des images
const fs = require("fs"); // Importe le module FileSystem pour la manipulation des fichiers

const imgConversion = (req, res, next) => { // Définit une fonction middleware pour la conversion des images
  // Vérifie si un fichier est téléchargé
  if (!req.file) { // Si aucun fichier n'est téléchargé dans la requête, passe à la prochaine fonction middleware
    return next();
  }

  console.log("Nom de fichier d'origine :", req.file.filename);

  // on met le nom de fichier à jour avant utilisation de sharp
  req.file.filename = req.file.filename.replace(/(.*)(\.jpg|\.jpeg|\.png)(?=[^.]*$)/, "$1.webp"); // Définit le chemin du fichier redimensionné avec l'extension .webp
  console.log("Nom de fichier mis à jour :", req.file.filename); // affiche dans la console le nom de fichier d'origine de la requête

  // on crée le chemin complet où le fichier redimensionné sera enregistré avec l'extension.webp
  const newFilePath = `images/${req.file.filename}`;
  console.log("Chemin du fichier pour Sharp :", newFilePath); 
  //affiche chemin complet où le fichier redimensionné sera enregistré avec l'extension .webp

  sharp(req.file.path) 	// on redimensionne l'image à une largeur de 206 pixels et une hauteur de 260 pixels
    .resize({
      width: 206,
      height: 260,
      fit: "cover",
    })
    .toFormat("webp", { quality: 90 })  // on converit l'image en format WebP
    .toFile(newFilePath) // Utilise le nouveau chemin de fichier
    .then(() => {
      // Supprime le fichier d'origine du système de fichier après la conversion en WebP
      fs.unlink(req.file.path, (err) => {
        if (err) {// on gère les erreurs lors du redimensionnement et de la conversion
          console.error("Erreur lors de la suppression du fichier original:", err); 
        }
        next();
      });
    })
    .catch((error) => {
      console.error("Erreur de traitement d'image :", error); // affiche dans la console une erreur survenue lors du traitement de l'image
      next();
    });
};

module.exports = imgConversion; // Exporte la fonction middleware imgConversion
