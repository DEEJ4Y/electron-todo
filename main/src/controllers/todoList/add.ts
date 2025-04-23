import { TodoList } from "@prisma/client";
import { IpcMainListener } from "../../types/ipcMain";
import prisma from "../../utils/prisma";

const addTodoList: IpcMainListener<TodoList> = async (
  _,
  data: { title: string; items: string[] }
) => {
  try {
    const todoList = await prisma.todoList.create({
      data: {
        title: data.title,
      },
    });

    const todos = await prisma.todo.createMany({
      data: data.items.map((item) => ({
        title: item,
        checked: false,
        listId: todoList.id,
      })),
    });

    console.log("created todoList", {
      ...todoList,
      todos: todos.count,
    });

    return todoList;
  } catch (error) {
    console.error(error);
    return null;
  }
};

export default addTodoList;
