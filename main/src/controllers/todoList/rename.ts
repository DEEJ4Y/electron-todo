import { IpcMainListener } from "../../types/ipcMain";
import prisma from "../../utils/prisma";

const renameTodoList: IpcMainListener<boolean> = async (
  _,
  data: { id: number; title: string }
) => {
  try {
    const todoList = await prisma.todoList.findFirst({
      where: {
        id: data.id,
      },
    });

    if (!todoList) {
      return false;
    }

    const updatedTodoList = await prisma.todoList.update({
      where: {
        id: data.id,
      },
      data: {
        title: data.title,
      },
    });

    if (!updatedTodoList) {
      return false;
    }

    return true;
  } catch (error) {
    console.error(error);
    return null;
  }
};

export default renameTodoList;
