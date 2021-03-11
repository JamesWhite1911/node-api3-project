const express = require('express');
const Users = require('./users-model')
const Posts = require('../posts/posts-model')
const { logger, validateUserId, validateUser, validatePost } = require('../middleware/middleware');

const router = express.Router();

router.get('/', async (req, res, next) => {
  try {
    const users = await Users.get()
    res.json(users)
  } catch (err) {
    next(err)
  }
});

router.get('/:id', validateUserId, (req, res) => {
  res.json(req.user)
});

router.post('/', validateUser, (req, res, next) => {
  Users.insert(req.body)
    .then(user => {
      res.status(201).json(user)
    })
    .catch(next)
})

router.put('/:id', validateUser, validateUserId, (req, res, next) => {
  const { id } = req.params
  const changes = req.body

  Users.update(id, changes)
    .then(user => {
      res.json({"id": JSON.parse(id), "name": `${changes.name}`})
    })
    .catch(next)
});

router.delete('/:id', validateUserId, (req, res, next) => {
  const { id } = req.params
  const deletedUser = req.user
  Users.remove(id)
    .then(() => {
      res.json(deletedUser)
    })
    .catch(next)
});

router.get('/:id/posts', validateUserId, (req, res) => {
  const { id } = req.params
  Users.getUserPosts(id)
    .then(() => {
      res
    })
    .catch(() => {
      res.status(500).json({
        message: 'Error getting posts'
      })
    })
});

router.post('/:id/posts', validateUserId, validatePost, (req, res, next) => {
  const { id } = req.params
  const posts = Users.getUserPosts(id)
  Posts.insert(req.body)
    .then(post => {
      res.status(201).json(post)
    })
    .catch(next)
});

module.exports = router;


//POSTS
//get - get all posts
//getById(id) - get a post by an id
//insert(post) - add a post
//update(id, changes) - update a post by id with changes
//remove(id) - remove a post by id

//USERS
//get - get all users
//getById(id) - get a user by id
//getUserPosts(userId) - get posts from a user matching their id
//insert(user) - add a user
//update(id, changes) - update a user by id with changes
//remove(id) - remove a user by id
