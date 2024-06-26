# P7_Grimoire_backend
# Lien vers mon repo Github
https://github.com/cyrelh/P7_Grimoire_backend

# Frontend
"npm install", puis "npm start" pour lancer le frontend.

# Backend 
"npm install", puis "nodemon server" pour lancer le backend. 
Il est nécessaire de créer un fichier .env pour accéder à la DB MongoDB.

## Configuration de la Base de Données MongoDB

Avant de lancer le projet, assurez-vous d'avoir configuré votre base de données MongoDB en suivant ces étapes :

1. Inscrivez-vous sur le site web de MongoDB à l'adresse https://www.mongodb.com/cloud/atlas/register pour obtenir un compte.

2. Une fois connecté à votre tableau de bord, créez un cluster et personnalisez sa configuration selon vos besoins.

3. Récupérez votre URI de connexion sur MongoDB et ajoutez-le dans un fichier .env.local que vous créerez à la racine du projet. Assurez-vous de configurer les variables d'environnement suivantes (qui seront répertoriées dans le fichier .env):

```
DATABASE_URI=mongodb+srv://${process.env.USER}:${process.env.PASSWORD}@${process.env.DATABASE_DOMAIN}
PASSWORD ="clique sur Edit Password ensuite clique sur autogenerate secure password"
USER ='your database-user'
DATABASE_DOMAIN= 'your database-domain'

```

# Fonctionnalités :

Gestion des livres : permettre l'ajout, la mise à jour et la suppression de livres.
Notation des livres : offrir la possibilité aux utilisateurs de donner une note aux livres sur une échelle de 0 à 5.
Authentification : inclure des fonctionnalités d'inscription et de connexion pour les utilisateurs.

# Models
User {
email : String - adresse e-mail de l’utilisateur [unique]
password : String - mot de passe haché de l’utilisateur
}

Book {
userId : String - identifiant MongoDB unique de l'utilisateur qui a créé le livre
title : String - titre du livre
author : String - auteur du livre
imageUrl : String - illustration/couverture du livre
year: Number - année de publication du livre
genre: String - genre du livre
ratings : [
{
userId : String - identifiant MongoDB unique de l'utilisateur qui a noté le livre
grade : Number - note donnée à un livre
}
] - notes données à un livre
averageRating : Number - note moyenne du livre
}

# Sécurité

Le mot de passe de l'utilisateur doit subir un processus de hash pour assurer sa sécurité.
Un niveau d'authentification renforcé est requis pour toutes les requêtes de réservation de livres.
Les adresses électroniques stockées dans la base de données doivent être uniques, et un plugin Mongoose approprié doit être utilisé pour garantir cette unicité et signaler les erreurs éventuelles.
La sécurité de la base de données MongoDB, comme celle fournie par un service tel que MongoDB Atlas, ne doit pas interférer avec le fonctionnement de l'application sur la machine de l'utilisateur.
Toutes les erreurs provenant de la base de données doivent être signalées et traitées correctement.