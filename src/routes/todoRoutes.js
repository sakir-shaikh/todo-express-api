import express from "express";
import prisma from "../prismaClient.js";

const router = express.Router();

//get all Todo function
const getAllToDos = async (request, response) => {
  const user = await prisma.todo.findMany({
    where: {
      userId: request.userId,
    },
  });
  response.json(todos);
};

//create todo function

const createToDo = async (request, response) => {
  //TODO : implement the function for creating the todo

  const { task } = request.body;
  const todo = await prisma.todo.create({
    data: {
      task,
      userId: request.userId,
    },
  });
  response.json(todo);
};

const updateTodo = async (request, response) => {
  //TODO : implement the updating logic for the task

  const { completed } = request.body;
  const { id } = request.params;
  const updatedTodo = await prisma.todo.update({
    where: {
      id: id,
      userId: request.userid,
    },
    data: {
      //since completed value is coming through as the integer so we are converting it into the respective boolean value.

      completed: !!completed,
    },
  });
  response.json({
    message: "completed todo",
  });
};

const deleteToDo = async (request, response) => {
  const { id } = request.params;
  const userId = request.userId;
  await prisma.todo.delete({
    where: {
      id: id,
      userId: request.userId,
    },
  });

  response.send({ message: "Todo deleted" });
};

//get all Todo endpoint
router.get("/", getAllToDos);

//create todo endpoint
router.post("/", createToDo);

//update todo endpoint
router.put("/:id", updateTodo);

router.delete("/:id", deleteToDo);

export default router;
