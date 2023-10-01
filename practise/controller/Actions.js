const config = require("../config/config");
const model_register = require("../model/boatregister");
const model_login = require("../model/boatlogin");
const jwt = require("jsonwebtoken");

const GetAllUser = async (req, res) => {
  try {
    res.send("Hello abhishek");
  } catch (error) {}
};


const earpodes = [
  {
    id:200,
    name:"Airdopes 131",
    price:849,
    poster:"https://cdn.shopify.com/s/files/1/0057/8938/4802/files/131_f04f74fd-45d4-4614-85cf-6ccf69c4cf90.jpg?v=1691395049",
    qty:1,
  },
  {
    id:201,
    name:"Airdopes 161",
    price:999,
    poster:"https://cdn.shopify.com/s/files/1/0057/8938/4802/files/AD_161.jpg?v=1686297917",
    qty:1,
  },
  {
    qty:1,
    id:202,
    name:"Rockerz 235 V2",
    price:799,
    poster:"https://cdn.shopify.com/s/files/1/0057/8938/4802/files/rockerz_ea76e8ff-d95c-49da-b6c9-fca4304dce11.jpg?v=1685686978"
  },
  {
    qty:1,
    id:203,
    name:"Rockerz 0 V1",
    price:809,
    poster:"https://cdn.shopify.com/s/files/1/0057/8938/4802/files/rockerz_ea76e8ff-d95c-49da-b6c9-fca4304dce11.jpg?v=1685686978"
  },
]

const gamming_band = [{
  qty:1,
  id:300,
  name:"Immortal 131",
  price:999,
  poster:"https://cdn.shopify.com/s/files/1/0057/8938/4802/products/IM131-FI_Black01-PhotoRoom.png-PhotoRoom_300x.png?v=1674687289"
},
{
  qty:1,
  id:301,
  name:"Immortal 121",
  price:1099,
  poster:"https://cdn.shopify.com/s/files/1/0057/8938/4802/files/ezgif-1-6381642bb4.gif?v=1685013470"
},
{
  id:302,
  qty:1,
  name:"Immortal 128",
  price:1499,
  poster:"https://cdn.shopify.com/s/files/1/0057/8938/4802/files/ezgif-1-6381642bb4.gif?v=1685013470"

}

];

const watch = [
  {
    id:400,
    name:"Wave Flex Connect",
    poster:"https://cdn.shopify.com/s/files/1/0057/8938/4802/files/Wave_Flex_Connect.jpg?v=1689751649",
    price:1499,
    qty:1
  },
  {
    id:401,
    name:"Storm Call",
    poster:"https://cdn.shopify.com/s/files/1/0057/8938/4802/files/Storm_Call.jpg?v=1682408982",
    price:1799,
    qty:1
  },
  {
    id:402,
    name:"Storm Call",
    poster:"https://cdn.shopify.com/s/files/1/0057/8938/4802/files/Storm_Call.jpg?v=1682408982",
    price:1799,
    qty:1
  }
]

const CreateUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    console.log(req.body);
    if (name !== "" || email !== "" || password !== "") {
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
    console.log(email, password);

    if (!email || !password) {
      return res
        .status(400)
        .json({ msg: "Please provide both email and password", status: 400 });
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

const Allproducts = async (req, res) => {
  const { cabels } = req.body;

  try {
    if (cabels === "watch") {
      res.send({msg:watch});
    } else if (cabels === "game") {
      res.send({msg:gamming_band})
    } else if (cabels === "earbuds") {
      res.send({msg:earpodes})
    }
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  GetAllUser,
  CreateUser,
  LoginUser,
  Allproducts,
};
