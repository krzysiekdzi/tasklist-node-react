const jwt = require('jsonwebtoken')

const handleRefresh = (req, res) => {
    const {token} = req.body

    try {
        const decoded = jwt.verify(token, process.env.REFRESH_SECRET)
        const { email, id } = decoded

        const accessToken = jwt.sign({email: email, id: id}, process.env.ACCESS_SECRET, {
            expiresIn: '1h',
        })
        return res.status(201).json({token: accessToken})

      } catch (error) {
        return res.status(400).send('Refresh token not verified')
      }
}

module.exports = handleRefresh;