const Users = require('../users/users-model')

function logger(req, res, next) {
  // logger logs to the console the following information about each request: request method, request url, and a timestamp
  // this middleware runs on every request made to the API
  res.use('*', (req, res, next) => {
    console.log(req.method, req.url, Date.now())
    next()
  })
}

const validateUserId = async (req, res, next) => {
  try {
    const { id } = req.params
    const user = await User.getById(id)
  
    const alert = res.status(404)
    const notFound = { message: "user not found" }

    if (!user) {
      alert.json(notFound)
    } else {
      req.user = user
      next()
    }
  } catch (err) {
    next(err)
  }
}

function validateUser(req, res, next) {
  const { body } = req

  const alert = res.status(400)
  const missing = { message: "missing user data" } //potential issue with const

  if (!body) {
    alert.json(missing)
    if (!body.name) {
      missing = { message: "missing required name field" }
      alert.json(missing)
    }
  } else {
    next()
  }
}

function validatePost(req, res, next) {
  const { body } = req

  const alert = res.status(400)
  const missing = { message: "missing post data" } //potential issue with const

  if (!body) {
    alert.json(missing)
    missing = { message: "missing required text or user_id fields" }
    if (!body.text || !body.user_id) {
      alert.json(missing)
    }
  } else {
    next()
  }
}

module.exports = {
  logger,
  validateUserId,
  validateUser,
  validatePost
}

// do not forget to expose these functions to other modules


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