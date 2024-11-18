const { search } = require('../models');
const axios = require('axios');
const qs = require('qs');

require('dotenv').config(); // Charger dotenv


const searchController = {
  getAllSearches: async (req, res) => {
    console.log("getAllSearches");
    try {
      const searches = await search.findAll();
      res.send({ message: "Liste des recherches", searches: searches });
    } catch (error) {
      console.error("Error fetching searches:", error);
      res.status(500).send({ message: "Erreur serveur" });
    }
  },

  getSearchById: async (req, res) => {
    try {
      const searchResult = await search.findByPk(req.params.id);
      if (!searchResult) {
        return res.status(404).send({ message: "Recherche non trouvée" });
      }
      res.send({ message: "Recherche trouvée", search: searchResult });
    } catch (error) {
      console.error("Error fetching search:", error);
      res.status(500).send({ message: "Erreur serveur" });
    }
  },

  createSearch: async (req, res) => {
    try {
      const { query, page = 1, pageSize = 20 } = req.body; // Récupérer les paramètres de pagination
      const CLE_API = process.env.CLE_API;

      // Calculer le paramètre "debut"
      const debut = (page - 1) * pageSize; // Calcul du rang du premier établissement à afficher

      // Appel à l'API externe avec les paramètres de recherche
      const response = await axios.get(
        `https://api.insee.fr/entreprises/sirene/V3.11/siret`,
        {
          params: {
            q: `denominationUniteLegale:${query}`,
            nombre: pageSize, // Nombre d'unités à afficher par page
            debut: debut, // Rang du premier établissement à afficher
            tri: true, // Activez le tri si nécessaire
          },
          headers: {
            Authorization: `Bearer ${CLE_API}`,
          },
        }
      );

      // Traitement des résultats
      const results = response.data; // Assurez-vous que c'est bien la structure que vous attendez
      const totalResults = results.header.total; // Récupérez le total des résultats

      res.send({
        totalResults: totalResults,
        etablissements: results.unitesLegales || results, // Ajustez en fonction de la structure des données renvoyées
      });
    } catch (error) {
      console.error("Error creating search:", error);
      res.status(500).send({ message: "Erreur lors de la recherche" });
    }
  },

  updateSearch: async (req, res) => {
    try {
      const { search } = req.body;
      const { id } = req.params;
      const searchId = await search.findByPk(id);
      if (!searchId) {
        return res.status(404).send({ message: "Recherche non trouvée" });
      }
      searchId.search = search;
      await searchId.save();
      res.send({ message: "Recherche mise à jour", search });
    } catch (error) {
      console.error("Error updating search:", error);
      res.status(500).send({ message: "Erreur serveur" });
    }
  },

  deleteSearch: async (req, res) => {
    try {
      const searchResult = await search.findByPk(req.params.id);
      if (!searchResult) {
        return res.status(404).send({ message: "Recherche non trouvée" });
      }
      await searchResult.destroy();
      res.send({ message: "Recherche supprimée" });
    } catch (error) {
      console.error("Error deleting search:", error);
      res.status(500).send({ message: "Erreur serveur" });
    }
  },

  getHome: (req, res) => {
    res.send({ message: "Seaaaaaaarrrch" });
  },
};

module.exports = searchController;
