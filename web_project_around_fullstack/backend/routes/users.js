const router = require('express').Router();

const {
  getUsers,
  getUserById,
  getCurrentUser,
  updateProfile,
  updateAvatar,
} = require('../controllers/users');

const {
  validateUserId,
  validateUpdateProfile,
  validateUpdateAvatar,
} = require('../validations/users');

router.get('/', getUsers);

router.get('/me', getCurrentUser);

router.get('/:userId', validateUserId, getUserById);

router.patch('/me', validateUpdateProfile, updateProfile);

router.patch('/me/avatar', validateUpdateAvatar, updateAvatar);

module.exports = router;
