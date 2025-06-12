import express from "express";
import bycrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import prisma from "../prismaClient.js";

const router = express.Router();

const handleRegister = async (request, response) => {
  const { username, password } = request.body;
  const hashedPassword = bycrypt.hashSync(password, 12);

  //this is for the saving the new user to the db
  try {
    const user = await prisma.user.create({
      data : {
        username, 
        password : hashedPassword
      }
    })

    //now that we have created an user now we want to show it a default todo for them.
    const defaultTodo = "Hello :) Add your first ToDo";
    prisma.todo.create({
      data : {
        task : defaultTodo,
        userId : user.id
      }
    })
    // create a token
    const token = jwt.sign(
      { id: user.id },
      process.env.JWT_SECRET_KEY,
      { expiresIn: "12h" }
    );

    response.json({ token });
  } catch (err) {
    console.log("in the catch block");
    response.sendStatus(503);
  }
};

const handleLogin = async (request, response) => {
  const { username, password } = request.body;
  try {
    const user = await prisma.user.findUnique({
      where : {
        username : username
      }
    })
    if (!user) {
      return response.status(404).send({
        message: "User not found.",
      });
    } 

    const isPasswordValid = bycrypt.compareSync(password, user.password);

    //if password doesn't match then we will send the message to user. 
    if(!isPasswordValid){
   return response.status(401).send({
        message: "password is incorrect",
      });

    }


    //if the password match then we will logged in the user

    //first we allocate the jwt token for user to authenticate the crud operation for the to-do app
    const token = jwt.sign({id : user.id}, process.env.JWT_SECRET_KEY,{expiresIn : "12h"} );
   
    response.json({token})
  } catch (err) {
    console.log(err.message);
    response.sendStatus(503);
  }
};

router.post("/register", handleRegister);
router.post("/login", handleLogin);

export default router;
