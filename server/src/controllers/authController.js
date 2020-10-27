const User = require('../models/User');
const jwt = require('jsonwebtoken');
const { create } = require('../models/User');
const middlewares = require('../middlewares');
require('dotenv').config();

module.exports = {
  async register(req, res, next) {
    try {
      const newUser = new User({
        Email: req.body.email,
        Name: req.body.name,
        Password: req.body.password,
      });
      const createdUser = await newUser.save();
      jwt.sign(
        { id: createdUser.id },
        process.env.JWT_SECRET,
        { expiresIn: 3600 },
        (err, token) => {
          if (err) {
            throw err;
          }
          res.json({
            token,
            user: createdUser,
          });
        },
      );
    } catch (e) {
      next(e);
      console.log(e);
    }
  },

  async login(req, res) {
    try {
      const email = req.body.email;
      const password = req.body.password;
      const user = await User.findOne({ Email: email }).exec();
      if (!user) {
        return res.status(403).send({
          error: 'No user found with details',
        });
      }

      const isPasswordValid = await user.comparePassword(password);

      if (!isPasswordValid) {
        return res.status(403).send({
          error: 'Password is incorrect',
        });
      }

      const userJson = user.toJSON();
      jwt.sign(
        { id: user.id },
        process.env.JWT_SECRET,
        { expiresIn: 3600 },
        (err, token) => {
          if (err) {
            throw err;
          }
          res.json({
            token,
            user,
          });
          return;
        },
      );
    } catch (e) {
      res.status(500).send({
        error: 'An error occured',
      });
      return;
    }
  },

  async authUser(req, res) {
    try {
      const user = await User.findOne({ _id: req.user.id }).select(
        '-Password',
      );
      if (!user) throw Error('User Does not exist');
      res.json(user);
      return;
    } catch (e) {
      console.log(e);
      res.status(500).send({
        error: 'An error occured',
      });
      return;
    }
  },
};
