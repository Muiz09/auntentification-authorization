const { User, Liquid, Category, Favorite } = require('../models/index');
const Joi = require('joi');
const { generateToken } = require('../helpers/jwt');
const bcrypt = require('bcrypt');
const { v4: uuidv4 } = require('uuid');
const mailer = require('../helpers/nodemailer')
const { handleClientError, handleServerError } = require('../helpers/errorHandler')


const register = async (req, res) => {
  try {
    const registerSchema = Joi.object({
      username: Joi.string().required(),
      email: Joi.string().required(),
      password: Joi.string().required(),
      role: Joi.string().required(),
    });

    const { value, error } = registerSchema.validate(req.body);
    if (error) return res.status(400).json({ error: error.details[0].message });

    const { username, email, password, role } = value;

    const sameUser = await User.findOne({ where: { email } });
    if (sameUser) return handleClientError(res, 404, 'User with the same Email already exists.');

    const user = await User.create({ username, email, password, role })
    res.status(201).json({
      user,
      message: 'Success Register'
    });
  } catch (err) {
    return handleServerError(res);
  }
}

const login = async (req, res) => {
  try {
    const loginSchema = Joi.object({
      email: Joi.string().required(),
      password: Joi.string(),
    });

    const { value, error } = loginSchema.validate(req.body);
    if (error) return res.status(400).json({ error: error.details[0].message });

    const { email, password } = value;

    const findUser = await User.findOne({ where: { email: email } });
    if (!findUser) return handleClientError(res, 404, "Email not found");

    const passwordValidasi = bcrypt.compareSync(password, findUser.password);
    if (!passwordValidasi) return handleClientError(res, 404, "Password is not correct");

    if (passwordValidasi) {
      const token = generateToken({
        id: findUser.id,
        email: findUser.email
      })
      res.status(200).json({
        token,
        message: 'Success Login'
      })
    };
  } catch (err) {
    return handleServerError(res);
  };
};

const readAllLiquid = async (req, res) => {
  try {
    const liquid = await Liquid.findAll({
      order: [['id', 'ASC']],
      attributes: ["id", "flavour", "merek", "volume", "nikotin"],
      include: [
        {
          model: Category,
          attributes: ["id", "category"]
        }
      ]
    });
    res.status(200).json({
      liquid,
      message: 'Succes'
    });
  } catch (err) {
    return handleServerError(res);
  }
}

const addFavorite = async (req, res) => {
  try {
    const { id } = req.params;
    const { userId } = req.additionalData;
    const findLiquid = await Liquid.findByPk(id, {
      order: [['id', 'ASC']],
      attributes: ["id", "flavour", "merek", "volume", "nikotin", "categoryId"],
      include: [
        {
          model: Category,
          attributes: ["id", "category"]
        }
      ]
    });
    if (!findLiquid) return handleClientError(res, 404, 'Liquid not found');

    const fav = await Favorite.create({
      flavour: findLiquid.flavour,
      merek: findLiquid.merek,
      volume: findLiquid.volume,
      nikotin: findLiquid.nikotin,
      categoryId: findLiquid.categoryId,
      category: findLiquid.Category.category,
      userId: userId
    });
    res.status(200).json({
      fav,
      message: 'Succes'
    });
  } catch (err) {
    return handleServerError(res);
  };
};

const readFav = async (req, res) => {
  try {
    const { userId } = req.additionalData;
    const favorite = await Favorite.findAll({ where: { userId } });
    res.status(200).json({
      favorite,
      message: 'Succes'
    });
  } catch (err) {
    return handleServerError(res);
  }
}

const deleteFav = async (req, res) => {
  try {
    const { userId } = req.additionalData;
    const { id } = req.params;

    const favorite = await Favorite.findOne({ where: { userId, id } });
    if (!favorite) return handleClientError(res, 404, 'Data not found');

    await Favorite.destroy({ where: { userId, id } });
    res.status(200).json({ message: 'Favorites deleted successfully' });
  } catch (err) {
    return handleServerError(res)
  }
}

const resetPassword = async (req, res) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ where: { email } });
    if (!user) return handleClientError(res, 404, 'User not found');

    const token = uuidv4();
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(token, salt);

    await User.update({ password: hash }, {
      where: { email },
      returning: true
    });

    mailer(email, token)
    res.status(200).json({ message: 'Success send email' });
  } catch (err) {
    return handleServerError(res)
  }
}

module.exports = {
  register,
  login,
  readAllLiquid,
  addFavorite,
  readFav,
  deleteFav,
  resetPassword
}