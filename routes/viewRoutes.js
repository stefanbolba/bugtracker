const express = require('express');
const authorizationController = require('./../controllers/authorizationController');
// const commentController = require('./../controllers/commentsController');
const viewsController = require('./../controllers/viewsController');

const router = express.Router();

router
  .route('/')
  .get(
    authorizationController.isLoggedIn,
    authorizationController.protect,
    viewsController.getOverview
  );

router
  .route('/addissue')
  .get(
    authorizationController.isLoggedIn,
    authorizationController.protect,
    viewsController.getAddIssue
  );

router.get(
  '/issues',
  authorizationController.isLoggedIn,
  authorizationController.protect,
  viewsController.getIssues
);
router.get(
  '/issues/:id',
  authorizationController.isLoggedIn,
  authorizationController.protect,
  viewsController.getIssueById
);

//Recover password
router.get('/recover/:id', viewsController.recover)

//Get User Data
router.get(
  '/me',
  authorizationController.isLoggedIn,
  authorizationController.protect,
  viewsController.getMe
);

//Get the login and signup page
router.get('/login', viewsController.logInForm);

module.exports = router;
