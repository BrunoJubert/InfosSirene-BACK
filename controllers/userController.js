// controllers/userController.js
const { User } = require('../models');
const { get } = require('../routes/userRouter');
const { hashPassword, verifyPassword, generateJWTToken } = require('../utils/auth');

const userController = {
  getAllUsers: async (req, res) => {
    try {
      const users = await User.findAll();
      res.send({ message: 'Liste des utilisateurs', users: users });
    } catch (error) {
      console.error('Error fetching users:', error);
      res.status(500).send({ message: 'Erreur serveur' });
    }
  },

  getUserByToken: async (req, res) => {
    try {
      const user = await User.findByPk(req.userData.userId);
      res.send({ message: 'Utilisateur', user: user });
    } catch (error) {
      console.error('Erreur lors de la récupération de l\'utilisateur:', error);
      res.status(500).send({ message: 'Erreur serveur lors de la récupération de l\'utilisateur' });
    }
  },

  login: async (req, res) => {
    try {
      const { email, password } = req.body;
      const user = await User.findOne({ where: { email } });
      if (!user) {
        return res.status(400).send({ message: 'Email ou mot de passe incorrect' });
      }
      const isPasswordValid = await verifyPassword(user.password, password);
      if (!isPasswordValid) {
        return res.status(400).send({ message: 'Email ou mot de passe incorrect' });
      }
      const token = generateJWTToken(user);
      return res.status(200).send({
        message: 'Connexion réussie',
        user: {
          id: user.id,
          email: user.email,
          firstName: user.firstName,
          lastName: user.lastName
        },
        token: token
      });
    } catch (error) {
      console.error('Erreur dans la méthode login:', error);
      return res.status(500).send({ message: 'Erreur serveur lors de la connexion' });
    }
  },

  createUser: async (req, res) => {
    try {
      const { firstName, lastName, email, password } = req.body;
      if (!firstName || !email || !lastName || !password) {
        return res.status(400).send({ message: 'Tous les champs sont requis' });
      }
      const hashedPassword = await hashPassword(password);
      
      const newUser = await User.create({
        firstName,
        lastName,
        email,
        password: hashedPassword,
      });
      
      res.status(201).send({
        message: 'Bienvenue ' + newUser.firstName + ' ' + newUser.lastName,
        user: newUser,
      });
    } catch (error) {
      console.error('Erreur lors de la création de l\'utilisateur:', error);
      if (error.name === 'SequelizeUniqueConstraintError') {
        return res.status(400).send({ message: 'Cet email est déjà utilisé' });
      }
      res.status(500).send({ message: 'Erreur serveur lors de la création de l\'utilisateur' });
    }
  },

  updateUser: async (req, res) => {
    try {
      const { firstName, lastName, email, password } = req.body;
      const { id } = req.params;

      const user = await User.findByPk(id);
      if (!user) {
        return res.status(404).send({ message: 'Utilisateur non trouvé' });
      }

      // Mise à jour des champs
      if (firstName) user.firstName = firstName;
      if (lastName) user.lastName = lastName;
      if (email) user.email = email;

      // Traitement spécial pour le mot de passe
      if (password) {
        const hashedPassword = await hashPassword(password);
        user.password = hashedPassword;
      }

      // Sauvegarde des modifications
      await user.save();

      // Préparation de la réponse sans le mot de passe
      const { password: _, ...userWithoutPassword } = user.toJSON();
      
      res.send({ message: 'Utilisateur mis à jour', user: userWithoutPassword });
    } catch (error) {
      console.error('Erreur dans la méthode updateUser:', error);
      res.status(500).send({ message: 'Erreur serveur lors de la mise à jour de l\'utilisateur' });
    }
  },

  deleteUser: async (req, res) => {
    try {
      const { id } = req.params;
      const user = await User.findByPk(id);
      
      if (!user) {
        return res.status(404).send({ message: 'Utilisateur non trouvé' });
      }
      
      await user.destroy();
      
      res.send({ message: 'Utilisateur supprimé' });
    } catch (error) {
      console.error('Erreur lors de la suppression de l\'utilisateur:', error);
      res.status(500).send({ message: 'Erreur serveur lors de la suppression de l\'utilisateur' });
    }
  },
};

module.exports = userController;
