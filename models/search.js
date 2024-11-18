'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Search extends Model {
    static associate(models) {
      // Définir l'association avec le modèle User
      Search.belongsTo(models.User, { foreignKey: 'userId', as: 'user' });
    }
  }

  Search.init({
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    query: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  }, {
    sequelize,
    modelName: 'Search',
  });

  return Search;
};
