const Issue = require('./../models/issueModel');
const User = require('./../models/userModel');
const Comment = require('./../models/commentsModel');
const Category = require('./../models/categoryModel');
const Version = require('./../models/versionModel');
const APIFeatures = require('./../utils/apiFeatures');
const AppError = require('./../utils/appError');
const catchAsync = require('./../utils/catchAsync');
const { query } = require('express');

//Home Page
exports.getOverview = catchAsync(async (req, res, next) => {
  //1) Get all the issues
  const issues = await Issue.find();

  //2) Build the template
  //Done in views folder
  //3) Render that template using the issues varialbe
  res.status(200).render('overview', {
    title: 'Home Page',
    issues,
  });
});

exports.createComment = catchAsync(async (req, res, next) => {
  const comment = await Comment.create({
    user: req.user.id,
    comment: req.body.comment,
    issue: req.body.issue,
  });

  res.status(200).render('overview', {
    title: 'Home Page',
  });
});

//Log In Page
exports.logInForm = catchAsync(async (req, res, next) => {
  res.status(200).render('login', {
    title: 'Log In Page',
  });
});

//Add Issues Page
exports.getAddIssue = catchAsync(async (req, res, next) => {
  const users = await User.find({ name: { $ne: 'admin' } }).select('name');
  const category = await Category.find().select('name');
  const version = await Version.find().select('name');

  res.status(200).render('addIssue', {
    title: 'Add Issue Page',
    users,
    category,
    version,
  });
});

exports.getIssues = catchAsync(async (req, res, next) => {
  const features = new APIFeatures(Issue.find(), req.query)
    .filter()
    .sort()
    .limitFields()
    .search()
    .paginate();

  const issue = await features.query;
  const category = await Category.find().select('name');
  const asignee = await User.find({ name: { $ne: 'admin' } }).select('name');
  const totalIssues = await Issue.count({});

  const properties = resultProperties(req.query.fields);

  res.status(200).render('issues', {
    title: 'Find Issues Page',
    issue,
    category,
    asignee,
    splitDate,
    style,
    properties,
    pageNumber: req.query.page ? req.query.page : 1,
    resultsPage: req.query.limit ? req.query.limit : 20,
    totalIssues,
  });
});

exports.getIssueById = catchAsync(async (req, res, next) => {
  const issue = await Issue.findById(req.params.id).populate({
    path: 'comments',
  });
  const users = await User.find({ role: { $ne: 'admin' } }).select('name role');

  res.status(200).render('issueById', {
    title: issue.name,
    issue,
    users,
    splitDate,
  });
});

exports.getMe = (req, res, next) => { 
  res.status(200).render('account', {
    title: `${req.user.name} | Account`
  });
};

const splitDate = (date) => {
  const day = date.getDate() < 10 ? `0${date.getDate()}` : date.getDate();
  const month =
    date.getMonth() + 1 < 10 ? `0${date.getMonth() + 1}` : date.getMonth() + 1;
  const year = date.getFullYear();
  return `${day}/${month}/${year}`;
};
const style = (el) => {
  let color;
  if (el === 'task' || el === 'closed') color = '#c5d91d';
  if (el === 'bug' || el === 'open') color = '#f45e51';
  if (el === 'request' || el === 'in progress') color = '#4488c5';
  if (el === 'other' || el === 'resolved') color = '#5eb5a6';
  return `background-color: ${color}`;
};

const resultProperties = (arr2) => {
  const arr = [
    'type',
    'subject',
    'asignee',
    'status',
    'category',
    'priority',
    'created at',
    'due date',
    'registered by',
    'version',
  ];
  if (!arr2) return arr;
  arr2 = arr2
    .replace(/[-]/g, '')
    .replace('name', 'subject')
    .replace('dueDate', 'due date')
    .replace('createdAt', 'created at')
    .split(',');
  const results = arr.filter((val) => !arr2.includes(val));
  return results;
};
