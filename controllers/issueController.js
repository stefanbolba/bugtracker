const Issue = require('./../models/issueModel');
const handlerFactory = require('./handlerFactory');

const catchAsync = require('./../utils/catchAsync');
const AppError = require('./../utils/appError');

exports.getAllIssues = handlerFactory.getAll(Issue);
exports.getIssue = handlerFactory.getOne(Issue, { path: 'comments' });
exports.createIssue = handlerFactory.createOne(Issue);
exports.updateIssue = handlerFactory.updateOne(Issue);
exports.deleteIssue = handlerFactory.deleteOne(Issue);
exports.checkIssue = handlerFactory.checkOne(Issue)
