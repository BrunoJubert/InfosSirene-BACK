// app.js
require("dotenv").config();
const express = require("express");
const cors = require("cors");
const { sequelize } = require("./models");
const routes = require("./routes");
const middleware = require('./middleware/jwtAuth');
const verifyRecaptcha = require('./middleware/verifyRecaptcha'); // Ajout du middleware reCAPTCHA

const app = express();

app.use(cors());
app.use(express.json());
// app.use(middleware); 

// Routes
app.use("/", routes);

// Route de base pour vérifier que le serveur fonctionne
// app.get("/", (req, res) => {
//   res.send("Bienvenue sur l'API SIRENE");
// });

// Gestion des erreurs
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Quelque chose s'est mal passé!");
});

const port = process.env.PORT || 3000;

async function initializeDatabase() {
  try {
    await sequelize.authenticate();
    console.log("Connection à la base de données établie avec succès.");
    await sequelize.sync({ force: false });
    console.log("Base de données synchronisée");
    return true;
  } catch (error) {
    console.error("Impossible de se connecter à la base de données:", error);
    return false;
  }
}

const startServer = async () => {
  if (await initializeDatabase()) {
    app.listen(port, () => {
      console.log(`Le serveur a démarré sur le port ${port}`);
    });
  } else {
    console.error(
      "Impossible de démarrer le serveur en raison d'erreurs de base de données"
    );
  }
};

startServer();

process.on("SIGINT", async () => {
  try {
    await sequelize.close();
    console.log("Connexion à la base de données fermée");
    process.exit(0);
  } catch (error) {
    console.error("Erreur lors de la fermeture de la connexion :", error);
    process.exit(1);
  }
});

module.exports = app;
