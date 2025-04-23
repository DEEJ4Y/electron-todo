import { IpcMainListener } from "../../types/ipcMain";
import { TodoListWithTodos } from "../../types/todoList";
import prisma from "../../utils/prisma";

const getTodoListById: IpcMainListener<TodoListWithTodos> = async (
  _,
  id: number
) => {
  try {
    console.log("id", id);
    const todoList = await prisma.todoList.findUnique({
      where: { id: id },
    });

    if (!todoList) {
      return null;
    }

    const todos = await prisma.todo.findMany({
      where: { listId: todoList.id },
    });

    console.log("todos", todos);

    const todoListWithItems = { ...todoList, todos };

    return todoListWithItems;
  } catch (error) {
    console.error(error);
    return null;
  }
};

export default getTodoListById;
