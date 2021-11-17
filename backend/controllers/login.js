const jwt = require('jsonwebtoken')
const crypto = require("crypto");
const { findUserByEmail } = require('../queries/users')

const handleLogin = (req, res) => {
    const {email, password} = req.body
    findUserByEmail(email).then((user) => {
        if (!user) {
            return res.status(404).json({msg: 'User not found'})
        }
        const hash = crypto.createHash('md5').update(password + user.salt).digest('hex')
        if (hash === user.passwordhash){
            const accessToken = jwt.sign({email: email, id: user.id}, process.env.ACCESS_SECRET, {
                expiresIn: '1h',
            })
            const refreshToken = jwt.sign({email: email, id: user.id}, process.env.REFRESH_SECRET, {
                expiresIn: '7d',
            })
            return res.status(200).json({token: accessToken, refreshToken: refreshToken})
        }
        else {
            return res.status(401).json({msg: 'Invalid password'})
        }
    })
}

module.exports = handleLogin;