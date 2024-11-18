# Initialisation environnement Backend
-   `npm init -y`   

## On installe les dépendances
-   `npm install express sequelize mysql dotenv`

- `npm install nodemon --save-dev`

## On ecrit les scripts 

````
"dev": "nodemon index.js",
"start": "node index.js"
````

## Créer le fichier qui sera le point d'entrée de l'application 

Ce fichier est toujours à la racine de l'application : `app.js`

Puis les fichiers qui serviront à determiner les routes : 
-   `index.js` ( routes principales )
-   `userRouter.js` ( ici le router qui va gérer le CRUD d'un User)
-   `searchRouter.js` ( ce sera le router qui va gérer les routes des recherches d'un user, ce sera également du CRUD)

Un fichier important , le `.env` ( et le `.env.exemple` ) qui servira à savoir quelles variables d'environnement il y aura besoin
sans avoir à les divulguer puisque que le `.env ` va également se trouver dans un fichier `.gitignore`. 
Le tout se mettant à la racine de l'application. 


## L'arborescence de vos fichiers ressemble maintenant à ceci 


````
project_root/
│
├── config/
│   ├── database.js
│   └── sequelize.js
├── routes/
│   ├── index.js
│   ├── searchRouter.js
│   └── userRouter.js
├── node_modules/
├── models/
│   ├── index.js
│   ├── Search.js
│   └── User.js
├── .env
├── .env.example
├── .gitignore
├── app.js
├── package-lock.json
├── package.json
└── README.md

````


## On initialise un depot sur GitHub avant de coder

-   `git init`
-   `git add .`
-   `git commit -m "Initial commit"`

    ### Ensuite on lie le dépot local au dépot distant :

    -   On créer d'abord un nouveau REPOSITORY
    -   On le relie `git remote add origin git@github.com:USER/REPO_NAME.git` 
    -   Utilisant un clef SSH voici ma commande personalisée 
    `git remote add origin git@github.com:BrunoJubert/BACK_SIRENE.git`

    #### On fait un premier psuh : 
    -   Git Hub propose de créer une branche Main, le dépot étant vide ici on push directement avec : 
        `git push -u origin master `
        Par la suite, on crééra des branches pour travailler en sécurité avec les commandes habituelles.
        
    
