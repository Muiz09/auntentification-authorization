'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Favorite extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Favorite.init({
    flavour: DataTypes.STRING,
    merek: DataTypes.STRING,
    volume: DataTypes.INTEGER,
    nikotin: DataTypes.INTEGER,
    categoryId: DataTypes.INTEGER,
    category: DataTypes.STRING,
    userId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Favorite',
  });
  return Favorite;
};