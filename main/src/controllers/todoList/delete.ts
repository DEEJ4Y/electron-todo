import { IpcMainListener } from "../../types/ipcMain";
import prisma from "../../utils/prisma";

const deleteTodoList: IpcMainListener<boolean> = async (_, id: number) => {
  try {
    await prisma.todo.deleteMany({
      where: {
        listId: id,
      },
    });

    const todoLists = await prisma.todoList.deleteMany({
      where: {
        id: id,
      },
    });

    if (todoLists.count === 0) {
      return false;
    }

    return true;
  } catch (error) {
    console.error(error);
    return null;
  }
};

export default deleteTodoList;
