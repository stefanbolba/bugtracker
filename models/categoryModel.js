const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'A category must have a name!'],
      unique: true,
    },
    createdAt: {
      type: Date,
      default: Date.now(),
    },
    user: {
      type: mongoose.Schema.ObjectId,
      ref: 'User',
      required: [true, 'A category must be created by a registered user!'],
    },
  },
  {
    //Shows a filed that is calculated even thogh it does not
    //exist in the database
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

categorySchema.pre(/^find/, function (next) {
  this.populate({
    path: 'user',
    select: 'name role',
  });
  next();
});

const Category = mongoose.model('Category', categorySchema);
module.exports = Category;
