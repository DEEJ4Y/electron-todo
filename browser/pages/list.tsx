import {
  Button,
  Center,
  Checkbox,
  Container,
  Group,
  Stack,
  Text,
  TextInput,
  Title,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { useDisclosure } from "@mantine/hooks";
import { notifications } from "@mantine/notifications";
import { IconArrowLeft, IconPlus } from "@tabler/icons-react";
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";
import { useRouter } from "next/router";

export default function Home() {
  const router = useRouter();

  const [busy, setBusy] = useDisclosure(false);

  const todoListQuery = useQuery({
    queryKey: ["todoLists:getById"],
    queryFn: () =>
      window.electronAPI["todoLists:getById"](
        Number(String(router.query.listId))
      ),
  });

  const form = useForm({
    initialValues: {
      currItem: "",
    },
  });

  const checkTodo = async (id: number, checked: boolean) => {
    if (busy) return;

    setBusy.open();
    const result = await window.electronAPI["todos:toggle"]({ id, checked });

    if (!result) {
      notifications.show({
        title: "Error",
        message: "Something went wrong",
        color: "red",
      });
    } else {
      notifications.show({
        title: "Success",
        message: "Todo updated",
        color: "green",
      });
    }

    await todoListQuery.refetch();

    setBusy.close();
  };

  return (
    <Container fluid h="100vh">
      <Center h="100%">
        <Stack w="24rem" mx="auto">
          <Title order={1} ta="center">
            {todoListQuery.data?.title}
          </Title>

          {todoListQuery.data?.todos.map((todo) => (
            <Group key={todo.id}>
              <Checkbox
                checked={todo.checked}
                disabled={busy}
                onClick={() => checkTodo(todo.id, !todo.checked)}
              />
              <Text
                style={{ textDecoration: todo.checked ? "line-through" : "" }}
              >
                {todo.title}
              </Text>
            </Group>
          ))}

          <Link href="/">
            <Button
              variant="subtle"
              leftSection={<IconArrowLeft size="1rem" />}
            >
              Back
            </Button>
          </Link>
        </Stack>
      </Center>
    </Container>
  );
}
