const User = require('../models/user');

function reviewsIndex(req, res, next) {
  User
    .findById(req.params.userId)
    .populate('reviewAddedBy')
    .then(res => res.json())
    .catch(next);
}

function reviewsCreate(req, res, next) {
  User
    .findById(req.params.userId)
    .then(user => {
      user.reviews.push(req.body);
      return user.save();
    })
    .then(user => res.json(user))
    .catch(next);
}

function reviewsUpdate(req, res, next) {
  User
    .findById(req.params.userId)
    .then(user => {
      user.reviews.id(req.params.reviewId).set(req.body);
      return user.save();
    })
    .then(user => res.json(user))
    .catch(next);
}

function reviewsDelete(req, res, next) {
  User
    .findById(req.params.userId)
    .then(user => {
      user.reviews.id(req.params.reviewId).remove();
      return user.save();
    })
    .then( user => res.json(user))
    .catch(next);
}

module.exports = {
  index: reviewsIndex,
  create: reviewsCreate,
  delete: reviewsDelete,
  update: reviewsUpdate
};
