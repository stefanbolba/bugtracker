const express = require('express');
const issueController = require('./../controllers/issueController');
const commentsController = require('./../controllers/commentsController');
const authorizationController = require('./../controllers/authorizationController');

const router = express.Router();

router.use(authorizationController.protect);

router
  .route('/')
  .get(issueController.getAllIssues)
  .post(commentsController.setUserId, issueController.createIssue);

router
  .route('/:id')
  .get(issueController.getIssue)
  .patch(
    issueController.checkIssue,
    commentsController.restrictUpdate,
    issueController.updateIssue
  )
  .delete(
    authorizationController.restricTo('admin'),
    issueController.deleteIssue
  );

module.exports = router;
