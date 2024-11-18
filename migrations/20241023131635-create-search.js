'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Searches', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      query: {
        type: Sequelize.STRING,
        allowNull: false, // Assurez-vous que ce champ est requis
      },
      userId: {
        type: Sequelize.INTEGER,
        allowNull: false, // Assurez-vous que ce champ est requis
        references: {
          model: 'Users', // Nom de la table référencée
          key: 'id' // Clé primaire dans la table Users
        },
        onUpdate: 'CASCADE', // Mettre à jour si l'utilisateur change
        onDelete: 'SET NULL' // Mettre à NULL si l'utilisateur est supprimé
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP') // Valeur par défaut pour la date de création
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP') // Mettre à jour automatiquement
      }
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Searches');
  }
};
