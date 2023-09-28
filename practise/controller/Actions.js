const config = require("../config/config");
const model_register = require("../model/boatregister");
const model_login = require("../model/boatlogin");
const jwt = require("jsonwebtoken");

const GetAllUser = async (req, res) => {
  try {
    res.send("Hello abhishek");
  } catch (error) {}
};

const CreateUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    console.log(req.body)
    if (name!=="" || email!=="" || password!=="") {
      const check_email = await model_register.findOne({ email: email });
      if (!check_email) {
        const model_check = await model_register({
          name,
          email,
          password,
        });


        const { _id } = model_check;
        const token = jwt.sign({ _id }, config.name, { expiresIn: "1h" });
        await model_check.save();

        res.send({ msg: "successfully register", status: 200, token });
      } else {
        res.send({ msg: "User Already Register", status: 500 });
      }
    } else {
      res.send({ msg: "fill all entry", status: 400 });
    }
  } catch (error) {}
};

const LoginUser = async (req, res) => {
    try {
      const { email, password } = req.body;
  console.log(email,password)
      
      if (!email || !password) {
        return res.status(400).json({ msg: "Please provide both email and password", status: 400 });
      }
  
   
      const user = await model_register.findOne({ email });
  
      if (!user) {
        return res.status(404).json({ msg: "User not found", status: 404 });
      }
  
      const passwordMatch = user.password === password; 
  
      if (!passwordMatch) {
        return res.status(401).json({ msg: "Invalid password", status: 401 });
      }
  
      
      const token = jwt.sign({ _id: user._id }, config.name, { expiresIn: "1h" });
  
      res.status(200).json({ msg: "Login successful", status: 200, token });
    } catch (error) {
      console.error("Login error:", error);
      res.status(500).json({ msg: "Server error", status: 500 });
    }
  };

module.exports = {
  GetAllUser,
  CreateUser,
  LoginUser,
};
