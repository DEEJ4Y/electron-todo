import { TodoList } from "@prisma/client";
import { IpcMainListener } from "../../types/ipcMain";
import prisma from "../../utils/prisma";

const getAllTodoLists: IpcMainListener<TodoList[]> = async () => {
  try {
    const todoLists = await prisma.todoList.findMany({
      select: {
        id: true,
        title: true,
      },
    });

    return todoLists;
  } catch (error) {
    console.error(error);
    return null;
  }
};

export default getAllTodoLists;
