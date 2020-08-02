const mongoose = require('mongoose');

const versionSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'A version must have a name'],
      unique: true,
    },
    createdAt: {
      type: Date,
      default: Date.now(),
    },
    user: {
      type: mongoose.Schema.ObjectId,
      ref: 'User',
      required: [true, 'A version must be created by a registered user!'],
    },
  },
  {
    //Shows a filed that is calculated even thogh it does not
    //exist in the database
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

versionSchema.pre(/^find/, function (next) {
  this.populate({
    path: 'user',
    select: 'name role',
  });
  next();
});

const Version = mongoose.model('Version', versionSchema);
module.exports = Version;
