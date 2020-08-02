const Version = require('./../models/versionModel');
const factory = require('./handlerFactory');

exports.getVersion = factory.getOne(Version);
exports.getAllVersion = factory.getAll(Version);
exports.createVersion = factory.createOne(Version);
exports.updateVersion = factory.updateOne(Version);
exports.deleteVersion = factory.deleteOne(Version);