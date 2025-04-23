import { IpcMainListener } from "../../types/ipcMain";
import prisma from "../../utils/prisma";

const toggleTodo: IpcMainListener<
  boolean,
  { id: number; checked: boolean }
> = async (_, data) => {
  try {
    const todo = await prisma.todo.findUnique({
      where: {
        id: data.id,
      },
    });

    if (!todo) {
      return false;
    }

    const updatedTodo = await prisma.todo.update({
      where: {
        id: data.id,
      },
      data: {
        checked: data.checked,
      },
    });

    if (!updatedTodo) {
      return false;
    }

    return true;
  } catch (error) {
    console.error(error);
    return null;
  }
};

export default toggleTodo;
