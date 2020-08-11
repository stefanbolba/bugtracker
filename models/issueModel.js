const mongoose = require('mongoose');
const slugify = require('slugify');

const issueSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'An issue must have a name'],
      maxlength: [
        140,
        'An issue must have a Subject less or equll than 40 characters!',
      ],
      minlength: [
        10,
        'An issue must have a Subject less or equll than 40 characters!',
      ],
    },
    description: {
      type: String,
      required: [true, 'An issue must have a description'],
      minlength: 10,
      maxlength: 1000,
      trim: true,
    },
    slug: String,
    type: {
      type: String,
      default: 'task',
      required: [true, 'An issue must have a type!'],
      enum: {
        values: ['task', 'bug', 'request', 'other'],
        message: 'type is either task, bug, request or other!',
      },
    },
    status: {
      type: String,
      default: 'open',
      enum: {
        values: ['open', 'in progress', 'resolved', 'closed'],
        message: 'Status is either open, in progress, resolved, closed',
      },
    },
    category: {
      type: String,
      default: 'undefined',
      //Add the option later from a differen model
    },
    version: {
      type: String,
      default: 'undefined',
      //Add the option later from a differen model
    },
    priority: {
      type: String,
      default: 'low',
      enum: {
        values: ['low', 'medium', 'high'],
        message: 'Priority is either low, medium or high!',
      },
    },
    asignee: {
      type: String,
      default: 'undefined',
      //Add the option later from a differen model
    },
    user: {
      type: mongoose.Schema.ObjectId,
      ref: 'User',
      required: [true, 'An issue must be created by a registered user!'],
    },
    createdAt: {
      type: Date,
      default: Date.now(),
    },
    dueDate: {
      type: Date,
      required: [true, 'An issue must have a due date!']
    },
    updatedOn: Date,
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

//Index
issueSchema.index({ name: 'text' });

//Mongoose midleware
//Slugify the name
issueSchema.pre('save', function (next) {
  this.slug = slugify(this.name, { lower: true });
  next();
});

issueSchema.pre(/^find/, function (next) {
  this.populate({
    path: 'user',
    select: 'name role photo',
  });
  next();
});

//VIRTUAL POPULATE
issueSchema.virtual('comments', {
  ref: 'Comment',
  foreignField: 'issue',
  localField: '_id',
});

const Issue = mongoose.model('Issue', issueSchema);
module.exports = Issue;
