const User = require("../models/user.model");
const asyncHandler = require("express-async-handler");
const generateToken = require("../utilities/gentoken");

const signUpUser = asyncHandler(async (req, res) => {
    const { name, username, email, password } = req.body;
    const userExists=await User.findOne({email})
    if(userExists){
        res.send({message:"User already registered"})
    }
    else{
        const user = await User.create({
            name,
            username,
            email,
            password,
          });
          if (user) {
           return res
              .status(201)
              .send({
                message: "User registered Successfully",
                user: {
                  _id:user._id,
                  name:user.name,
                  username:user.username,
                  email:user.email,
                //   token:generateToken(user._id) 
                },
              });
          }
    }
   
});
const logInUser = asyncHandler(async (req, res) => {
  try{
    const { email, password } = req.body;
    const user=await User.findOne({email});
    const matchPassword=await user.matchPassword(password)
    console.log(user,matchPassword)
    if(user&&matchPassword){
          res
          .status(200)
          .send({
            message: "User LoggedIn Successfully",
            user:{
              _id:user._id,
              name:user.name,
              username:user.username,
              email:user.email,
            //   token:generateToken(user._id)
            }
          })
        }
  else{
    res.status(400).send({message:'Invalid email or password'} )
  }
  }
  catch(error){
      res.status(400).send({message:'Invalid email or password'} )
  }
});
const updateUserInfo=asyncHandler(async(req,res)=>{
  let {_id,firstname,lastname}=req.body;
  let user=await User.findOne({_id});
  if(user){
    user.firstname=firstname||user.firstname;
    user.lastname=lastname||user.lastname
  }
  user=await user.save();
  if(user){
    res.send({
      message:'User updated successfully',
      user:{
        _id:user._id,
        firstname:user.firstname,
        lastname:user.lastname,
        email:user.email,
        company_id:user.company_id,
        token:generateToken(user._id)
      }
    })
  }
  else{
    res.status(400).send({message:"Can't be updated"})
  }
})
const getUser=asyncHandler(async(req,res)=>{
  const id=req.query.id;
  const user=await User.find({id})
  if(user){
    res.send(user)
  }
})
module.exports = { signUpUser, logInUser,updateUserInfo,getUser};
