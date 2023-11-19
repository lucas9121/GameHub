const User = require('../../models/user');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

module.exports = {
  create,
  index,
  login,
  Delete,
  update,
  show,
  checkToken
};

function checkToken(req, res) {
  console.log('req.user', req.user);
  res.status(200).json(req.exp);
}

async function login(req, res) {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user) throw new Error();
    const match = await bcrypt.compare(req.body.password, user.password);
    if (!match) throw new Error();
    res.status(200).json( createJWT(user) );
  } catch(e) {
    res.status(400).json({msg: e.message, reason: 'Bad Credentials'});
  }
}

async function index(req, res) {
  try{
      const users = await User.find({})
      res.status(200).json(createJWT(users))
  } catch(e) {
      res.status(400).json(e)
  }
}

async function create(req, res) {
  try {
    const user = await User.create(req.body);
    // token will be a string
    const token = createJWT(user);
    // send back the token as a string
    // which we need to account for
    // in the client
    res.status(200).json(token);
  } catch (e) {
    console.error('Sign up error', e)
    res.status(400).json({msg: e.message});
  }
}

async function Delete(req,res) {
  try{
      await User.findByIdAndDelete(req.params.id)
      res.status(200).json('User Deleted')
  }catch(e){
      res.status(400).json(e)
  }
}

async function update(req, res) {
  try{
      const {body} = req
      const updatedUser = await User.findByIdAndUpdate(req.params.id, body, {new: true})
      if(updatedUser) {
        res.status(200).json(createJWT(updatedUser));
      } else {
        res.status(404).json({ error: 'User not found' });
      }
  }catch(e){
      console.error('Catch block error', e)
      res.status(500).json({error: 'Internal server error', details: e.message})
  }
}

async function show(req, res) {
  try{
      const {id} = await req.params
      const user = await User.findById(id)
      res.status(200).json(createJWT(user))
  } catch(e) {
      res.status(400).json(e)
  }
}


/*-- Helper Functions --*/

function createJWT(user) {
  return jwt.sign(
    // data payload
    { user },
    process.env.SECRET,
    { expiresIn: '24h' }
  );
}