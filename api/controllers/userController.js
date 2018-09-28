const UserModel = require('../models/userModel')
const md5 = require('md5');
const Utils = require('../utils');
const userAtt = "_id username"
const allAtt = "_id username password"

const getUserById = (req , res ) => {
  UserModel.findOne({"_id": req.params.userId},userAtt, function(err , user){
    if(err){
      res.status(404).json({ response: false , error:err })
    }else{
      if( !user || user === null || user === '' ){
        res.status(404).json({ response: false , message:`${req.params.userId} not found` })
      }else{
        res.status(200).json({response: true , user:user})
      }
    }
  })
}

const getAllUsers = (req , res) => {
  UserModel.find({}, userAtt , function(err , user){
    if(err){
      res.status(404).json({ response: false , message:err })
    }else{
      if( !user || user == null || user == '' ){
        res.status(404).json({ response: false , message:"No users in your mango" })
      }else{
        res.status(200).json({ response: true , users:user })
      }
    }
  })
}

const createUser = (req,res) =>{
  let newUser = new UserModel()
  newUser.username = req.body.username
  newUser.password = md5(`${req.body.password}`)
  if( Utils.passwordValidation(req.body.password) ){
    newUser.save((err,user) =>{
      if(err){
        res.status(500).json({ response: false , error:err})
      }else{
        res.status(200).json({response: true , user:user})
      }
    })
  }else{
    res.status(500).json({ response: false , error:"Invalid password"})
  }
}

const deleteUser = (req , res) =>{
  UserModel.findOne({"_id":req.params.userId}, '_id password', function(err,user){
    if(err){
      res.status(500).json({response: false , error:err})
    }else{
      if( user == null || user == '' ){
        res.json({response:false , error:'User does not exist'} )
      }else{
        var hash = md5(`${req.body.password}`)
        if( hash === user.password ){
          UserModel.remove({
            _id: req.params.userId
          }, function(err, user) {
            if (err)
              res.status(500).json({response: false , error:err});
            res.status(200).json({ response:true, message: 'User successfully deleted' });
          });
        }else{
          res.json({response:false , message: `Invalid password ${req.body.password}`})
        }
      }
    }
  })
}

const authenticateUser = (req,res) =>{
  UserModel.findOne({"username":req.body.username}, allAtt, function(err,user){
    if(err){
      res.status(500).json({response: false , error:err})
    }else{
      if( user == null || user == '' ){
        res.status(404).json({response:false , error:'User does not exist'} )
      }else{
        const hash = md5(`${req.body.password}`)
        if( hash === user.password ){
          res.status(200).json({ response: true , message: "You are now logged in", user:{ username: user.username , _id:user._id}})
        }else{
          res.status(404).json({response:false , message: "Invalid user and password combination"})
        }
      }
    }
  })
}

module.exports = {
  getUserById,
  getAllUsers,
  createUser,
  deleteUser,
  authenticateUser
}
