const express = require('express');
const categoryController = require('./../controllers/categoryController');
const authorizationController = require('./../controllers/authorizationController');
const commentsController = require('./../controllers/commentsController');

const router = express.Router();

router.use(authorizationController.protect);

router
  .route('/')
  .get(authorizationController.protect, categoryController.getAllCategories)
  .post(
    authorizationController.restricTo('admin'),
    commentsController.setUserId,
    categoryController.createCategory
  );

router.use(authorizationController.restricTo('admin'));

router
  .route('/:id')
  .get(categoryController.getCategory)
  .patch(categoryController.updateCategoty)
  .delete(categoryController.deleteCategory);

module.exports = router;
