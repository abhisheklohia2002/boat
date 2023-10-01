const Router = require("express").Router();
const actions = require('../controller/Actions');

Router.get('/',actions.GetAllUser);
Router.post('/register',actions.CreateUser)
Router.post("/login",actions.LoginUser);
Router.post("/products",actions.Allproducts)
module.exports = Router
