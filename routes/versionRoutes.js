const express = require('express');
const versionController = require('./../controllers/versionController');
const authorizationController = require('./../controllers/authorizationController');
const commentsController = require('./../controllers/commentsController');

const router = express.Router();

router.use(authorizationController.protect);

router
  .route('/')
  .get(versionController.getAllVersion)
  .post(
    authorizationController.restricTo('admin'),
    commentsController.setUserId,
    versionController.createVersion
  );

router.use(authorizationController.restricTo('admin'));

router
  .route('/:id')
  .get(versionController.getVersion)
  .patch(versionController.updateVersion)
  .delete(versionController.deleteVersion);

module.exports = router;
