const User = require('../users/users-model')

function logger(req, res, next) {
  const options = { timeZone: 'America/New_York' }
  console.log(`
  Method: ${req.method}\n
  URL: ${req.url}\n
  Time: ${Date.toLocaleString('en-US', options.timeZone)}
  `)
  next()
}

const validateUserId = async (req, res, next) => {
  try {
    const { id } = req.params
    const user = await User.getById(id)

    const alert = res.status(404)
    let notFound = { message: "user not found" }

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
  let missing = { message: "missing user data" }

  if (!body) {
    alert.json(missing)
    missing = { message: "missing required name field" }
    if (!body.name) {
      alert.json(missing)
    }
  } else {
    next()
  }
}

function validatePost(req, res, next) {
  const { body } = req

  const alert = res.status(400)
  let missing = { message: "missing post data" }

  if (!body) {
    alert.json(missing)
  } else if (!body.text || !body.user_id) {
    missing = { message: "missing required text or user_id fields" }
    alert.json(missing)
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
