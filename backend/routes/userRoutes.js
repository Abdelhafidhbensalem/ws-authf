const express = require("express");
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const User = require("../models/User");
const { registerRules, validator } = require("../middlewares/validator")
const isAuth = require("../middlewares/passport")
const router = express.Router()
//register
router.post("/register", registerRules(), validator, async (req, res) => {
  const { email, password } = req.body
  try {
    const existUser = await User.findOne({ email });
    if (existUser) {
      return res.status(400).send({ msg: "user already exist please login" })
    }
    const newUser = new User({ ...req.body });
    const hashedPassword = await bcrypt.hash(password, 10)
    newUser.password = hashedPassword
    await newUser.save();
    res.send({ newUser, msg: "user successfully registered" });
  } catch (error) {
    console.log(error);
    res.status(400).send({ error: error.message });
  }
});
// login Users
router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  try {
    const existUser = await User.findOne({ email })
    if (!existUser) {
      return res.status(400).send({ msg: "bad credentials!" });
    }
    const matched = await bcrypt.compare(password, existUser.password)
    if (!matched) {
      return res.status(400).send({ msg: "bad credentials" });
    }
    const payload = { _id: existUser._id }
    const token = jwt.sign(payload, process.env.privateKey)
    res.send({ user: existUser, token: token })
  } catch (error) {
    console.log(error);
    res.status(400).send({ error: error.message });
  }
})
//get current user:private router
router.get('/current',isAuth(),async(req,res)=>{
try {
 // console.log(req.user);
 res.send({ user: req.user})
} catch (error) {
  console.log(error);
  res.status(400).send({ error: error.message });
}
})
module.exports = router;
