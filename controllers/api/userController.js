
require('dotenv').config()
const jwt = require('jsonwebtoken')
const bcrypt =require('bcrypt')
const User = require('../../models/user')
const crypto = require('crypto')


const signup = async(req, res, next) => {
    try {
        const user = await User.create(req.body)
        const token = jwt.sign({user}, process.env.SECRET, {expiresIn: '48h'})
        res.locals.data.user = user
        res.locals.data.token = token
        next()
    } catch (error) {
        res.status(400).json({msg: error.message})
    }
}

const login = async (req, res, next) => {
    try {
        const user = await User.findOne({email: req.body.email})
        if (!user) throw new Error('User not found')
        const password = crypto.createHmac('sha256', process.env.SECRET).update(req.body.password).digest('hex').split('').reverse().join('')
        const match = await bcrypt.compare(password, user.password)
         if (!match) throw new Error('Password did nto match')
         res.locals.data.user = user
        res.locals.data.token = jwt.sign({user}, process.env.SECRET, {expiresIn: '48h'})
        next()

    }catch (error) {
        res.status(400).json({msg: error.message})
    }
}

  const getBookmarksByUser = async(req,res,next) => {
    try {
        const user = await User.findOne({email: res.locals.data.email}).populate('bookmarks').sort('bookmarks.createAt').exec()
        const bookmarks = user.bookmarks 
        res.locals.data.bookmarks = bookmarks
        next()
    } catch (error) {
        res.status(400).json({msg: error.message})
    }
    
  }


const respondWithToken = (req, res) => {
    res.json(res.locals.data.token)
}


const respondWithUser = (req, res) => {
    res.json(res.locals.data.user)
}

const respondWithBookmarks = (req, res) => {
    res.json(res.locals.data.bookmarks)
}
  module.exports = {
    login,
    signup,
    getBookmarksByUser,
    respondWithToken,
    respondWithUser,
    respondWithBookmarks
  }