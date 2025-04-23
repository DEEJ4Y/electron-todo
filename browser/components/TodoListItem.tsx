import { ActionIcon, Card, Group, Text, TextInput } from "@mantine/core";
import { IconEdit, IconTrash, IconX } from "@tabler/icons-react";
import { TodoList } from "@/types/todoList";
import { notifications } from "@mantine/notifications";
import { useForm } from "@mantine/form";
import { useDisclosure } from "@mantine/hooks";
import { useRouter } from "next/router";

interface ITodoListItemProps {
  todoList: TodoList;
  onUpdateComplete?: () => void;
}

export default function TodoListItem(props: ITodoListItemProps) {
  const router = useRouter();
  const form = useForm({
    initialValues: {
      title: props.todoList.title,
    },

    validate: {
      title: (value) => (value.length > 0 ? null : "Title is required"),
    },

    validateInputOnChange: true,
    validateInputOnBlur: true,
  });
  const [editMode, setEditMode] = useDisclosure(false);

  const deleteTodoList = async (id: number) => {
    const deleted = await window.electronAPI["todoLists:delete"](id);
    if (!deleted) {
      notifications.show({
        title: "Error",
        message: "Something went wrong",
        color: "red",
      });
    } else {
      notifications.show({
        title: "Success",
        message: "Todo list deleted",
        color: "green",
      });
    }

    props.onUpdateComplete?.();
  };

  const renameTodoList = async (id: number, title: string) => {
    const renamed = await window.electronAPI["todoLists:rename"]({ id, title });
    if (!renamed) {
      notifications.show({
        title: "Error",
        message: "Something went wrong",
        color: "red",
      });
    } else {
      notifications.show({
        title: "Success",
        message: "Todo list renamed",
        color: "green",
      });

      setEditMode.close();
    }

    props.onUpdateComplete?.();
  };

  return (
    <Card
      shadow="sm"
      radius="md"
      onClick={() => router.push(`/list?listId=${props.todoList.id}`)}
    >
      <Card.Section p="md">
        <Group justify="space-between">
          {editMode ? (
            <form
              onSubmit={form.onSubmit((values) =>
                renameTodoList(props.todoList.id, values.title)
              )}
            >
              <TextInput
                variant="unstyled"
                autoFocus
                {...form.getInputProps("title")}
              />
            </form>
          ) : (
            <Text
              size="h2"
              onClick={(e) => {
                e.stopPropagation();
                setEditMode.open();
              }}
            >
              {props.todoList.title}
            </Text>
          )}
          <Group>
            <ActionIcon
              variant="subtle"
              color="gray"
              onClick={(e) => {
                e.stopPropagation();
                setEditMode.toggle();
              }}
            >
              {editMode ? (
                <IconX className="action-icon" />
              ) : (
                <IconEdit className="action-icon" />
              )}
            </ActionIcon>
            <ActionIcon
              variant="subtle"
              color="red"
              onClick={(e) => {
                e.stopPropagation();
                deleteTodoList(props.todoList.id);
              }}
            >
              <IconTrash className="action-icon" />
            </ActionIcon>
          </Group>
        </Group>
      </Card.Section>
    </Card>
  );
}
