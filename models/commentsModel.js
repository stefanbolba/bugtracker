const mongoose = require('mongoose');

const commentsSchema = new mongoose.Schema(
  {
    comment: {
      type: String,
      minlength: [1, 'The text area is empty!'],
      required: [true, 'Comments can not be empty!'],
    },
    createdAt: {
      type: Date,
      default: Date.now(),
    },
    issue: {
      type: mongoose.Schema.ObjectId,
      ref: 'Issue',
      required: [true, 'Comments must belong to an issue!'],
    },
    user: {
      type: mongoose.Schema.ObjectId,
      ref: 'User',
      required: [true, 'Comments must belong to an user!'],
    },
  },
  {
    //Shows a filed that is calculated even thogh it does not
    //exist in the database
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

// Populate issue and user date
commentsSchema.pre(/^find/, function (next) {
  this.populate({
    path: 'user',
    select: 'name'
  });
  next();
});

const Comment = mongoose.model('Comment', commentsSchema);
module.exports = Comment;
