function logger(req, res, next) {
  // logger logs to the console the following information about each request: request method, request url, and a timestamp
  // this middleware runs on every request made to the API
}

function validateUserId(req, res, next) {
  // this middleware will be used for all user endpoints that include an id parameter in the url
  // (ex: /api/users/:id and it should check the database to make sure there is a user with that id.
  // if the id parameter is valid, store the user object as req.user and allow the request to continue
  // if the id parameter does not match any user id in the database, respond with status 404 and { message: "user not found" }
}

function validateUser(req, res, next) {
  // validateUser validates the body on a request to create or update a user
  // if the request body is missing, respond with status 400 and { message: "missing user data" }
  // if the request body lacks the required name field, respond with status 400 and { message: "missing required name field" }
}

function validatePost(req, res, next) {
  // validatePost validates the body on a request to create a new post
  // if the request body is missing, respond with status 400 and { message: "missing post data" }
  // if the request body lacks the required text or user_id fields, respond with status 400 and { message: "missing required text or user_id fields" }
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