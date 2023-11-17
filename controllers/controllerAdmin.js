const { User, Liquid } = require('../models/index');
const Joi = require('joi');
const { handleClientError, handleServerError } = require('../helpers/errorHandler')

const readAllUser = async (req, res) => {
  try {
    const user = await User.findAll()
    res.status(201).json({
      user,
      message: 'Success Register'
    });
  } catch (err) {
    return handleServerError(res);
  };
};

const addLiquid = async (req, res) => {
  try {
    const liquidSchema = Joi.object({
      flavour: Joi.string().required(),
      merek: Joi.string().required(),
      volume: Joi.number().min(30).required(),
      nikotin: Joi.number().min(3).required(),
      categoryId: Joi.number().required(),
    });

    const { error, value } = liquidSchema.validate(req.body);
    if (error) return res.status(400).json({ error: error.details[0].message });

    const { flavour, merek, volume, nikotin, categoryId } = value;

    const sameProduct = await Liquid.findOne({ where: { flavour } });
    if (sameProduct) return handleClientError(res, 400, 'Liquid is same');

    const createLiquid = await Liquid.create({ flavour, merek, volume, nikotin, categoryId });

    res.status(201).json({
      createLiquid,
      status: 'Success add liquid',
    });
  } catch (err) {
    return handleServerError(res);
  };
};

const editLiquid = async (req, res) => {
  try {
    const { id } = req.params;
    const liquidSchema = Joi.object({
      flavour: Joi.string().required(),
      merek: Joi.string().required(),
      volume: Joi.number().min(30).required(),
      nikotin: Joi.number().min(3).required(),
      categoryId: Joi.number().required(),
    });

    const { error, value } = liquidSchema.validate(req.body);
    if (error) return res.status(400).json({ error: error.details[0].message });

    const { flavour, merek, volume, nikotin, categoryId } = value;

    const sameProduct = await Liquid.findOne({ where: { flavour } });
    if (sameProduct) return handleClientError(res, 400, 'Liquid is same');

    const data = await Liquid.update({ flavour, merek, volume, nikotin, categoryId }, {
      where: { id: id },
      returning: true
    });
    res.status(201).json({
      data,
      status: 'Success Edit product',
    });
  } catch (err) {
    return handleServerError(res);
  }
};

const deleteLiquid = async (req, res) => {
  try {
    const { id } = req.params
    const liquid = await Liquid.findOne({ where: { id } });
    if (!liquid) return handleClientError(res, 404, 'Liquid not found');

    await Liquid.destroy({ where: { id } });
    res.status(200).json({ message: 'Liquid deleted successfully' });
  } catch (err) {
    return handleServerError(res);
  }
}




module.exports = {
  readAllUser,
  addLiquid,
  editLiquid,
  deleteLiquid
}