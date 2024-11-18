const { Model, DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  class Search extends Model {}

  Search.init(
    {
      query: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      results: {
        type: DataTypes.JSON,
        allowNull: false,
      },
      userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "search",
    }
  );
  return Search;
};
