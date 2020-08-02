const Comment = require('./../models/commentsModel');
const factory = require('./../controllers/handlerFactory');
const AppError = require('../utils/appError');

exports.setUserId = (req, res, next) => {
  if (!req.body.issue) req.body.issue = req.params.issueId;
  if (!req.body.user) req.body.user = req.user.id;
  next();
};

exports.restrictUpdate = (req, res, next) => {
  if(req.user.role === 'admin') return next();

  if (req.body.createdById !== req.user.id) {    
    return next(new AppError('You can only update your own posts!'));
  }
  next();
};

exports.getComment = factory.getOne(Comment, { path: 'user' });
exports.getAllComments = factory.getAll(Comment);
exports.createComment = factory.createOne(Comment);
exports.updateComment = factory.updateOne(Comment);
exports.deleteComment = factory.deleteOne(Comment);
exports.checkComment = factory.checkOne(Comment)
