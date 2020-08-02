const express = require('express');
const commentsController = require('./../controllers/commentsController');
const authorizationController = require('./../controllers/authorizationController');

const router = express.Router();

//Protect all the routes after this point
router.use(authorizationController.protect);

router
  .route('/')
  .get(
    authorizationController.restricTo('admin'),
    commentsController.getAllComments
  )
  .post(commentsController.setUserId, commentsController.createComment);

router
  .route('/:id')
  .get(
    authorizationController.restricTo('admin'),
    commentsController.getComment
  )
  .patch(
    commentsController.checkComment,
    commentsController.restrictUpdate,
    commentsController.updateComment
  )
  .delete(
    commentsController.checkComment,
    commentsController.restrictUpdate,
    commentsController.deleteComment
  );

module.exports = router;
