const jwt = require('jsonwebtoken')
const crypto = require("crypto");
const { createUser } = require('../queries/users')

const handleRegister = (req, res) => {
    const {email, password} = req.body
    const salt = crypto.randomBytes(10).toString('hex');
    const hash = crypto.createHash('md5').update(password + salt).digest('hex')
    
    try{
        createUser(email, salt, hash)
    } catch (error) {
        console.log(error)
    }

    const accessToken = jwt.sign({email: email, access: true}, process.env.ACCESS_SECRET,{
        expiresIn: '1h',
      })
    const refreshToken = jwt.sign({email: email, access: false}, process.env.REFRESH_SECRET, {
        expiresIn: '7d',
    })
    res.status(201).json({token: accessToken, refreshToken: refreshToken})
}

module.exports = handleRegister;