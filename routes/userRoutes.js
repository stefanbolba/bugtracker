const express = require('express');
const userController = require('./../controllers/userController');
const authorizationController = require('./../controllers/authorizationController');

const router = express.Router();

router.post('/signup', authorizationController.signUp);
router.post('/login', authorizationController.logIn);
router.post('/logout', authorizationController.logout);

router.post('/forgotPassword', authorizationController.forgotPassword);
router.patch('/resetPassword/:token', authorizationController.resetPassword);

//Protect all routes after this point
router.use(authorizationController.protect);

router.patch('/updateMyPassword', authorizationController.updatePassword);

router.get('/me', userController.getMe, userController.getUser);
router.patch(
  '/updateMe',
  userController.getMe,
  userController.uploadUserPhoto,
  userController.resizeUserPhoto,
  userController.updateMe
);
router.delete('/deleteMe', userController.getMe, userController.deleteMe);

router
  .route('/')
  .get(userController.getAllUsers)
  .post(userController.createUser);

// Restrict routes to admins only
router.use(authorizationController.restricTo('admin'));

router
  .route('/:id')
  .get(userController.getUser)
  .patch(userController.updateUser)
  .delete(userController.deleteUser);
// router.route('/').get().patch().delete();

module.exports = router;
