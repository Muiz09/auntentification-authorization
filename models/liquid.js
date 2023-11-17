'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Liquid extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.Category, {foreignKey: "categoryId"})
    }
  }
  Liquid.init({
    flavour: DataTypes.STRING,
    merek: DataTypes.STRING,
    volume: DataTypes.INTEGER,
    nikotin: DataTypes.INTEGER,
    categoryId: DataTypes.INTEGER,
  }, {
    sequelize,
    modelName: 'Liquid',
  });
  return Liquid;
};