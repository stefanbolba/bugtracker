const Category = require('./../models/categoryModel');
const factory = require('./../controllers/handlerFactory');

exports.getCategory = factory.getOne(Category);
exports.getAllCategories = factory.getAll(Category);
exports.createCategory = factory.createOne(Category);
exports.updateCategoty = factory.updateOne(Category);
exports.deleteCategory = factory.deleteOne(Category);
