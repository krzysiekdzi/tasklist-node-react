const jwt = require('jsonwebtoken')

const authenticationMiddleware = async (req, res, next) => {
  const authHeader = req.headers.authorization

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(400).send('No / wrong auth header provided')
  }

  const token = authHeader.split(' ')[1]

  try {
    const decoded = jwt.verify(token, process.env.ACCESS_SECRET)
    const { email, id } = decoded
    req.user = { email, id }
    next()
  } catch (error) {
    return res.status(401).send('Unauthorized')
  }
}

module.exports = authenticationMiddleware
