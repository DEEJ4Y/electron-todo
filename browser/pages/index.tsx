import TodoListItem from "@/components/TodoListItem";
import { Button, Center, Container, Stack, Text, Title } from "@mantine/core";
import { IconPlus } from "@tabler/icons-react";
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";

export default function Home() {
  const todoListsQuery = useQuery({
    queryKey: ["todoLists:get"],
    queryFn: () => window.electronAPI["todoLists:get"](null),
  });

  return (
    <Container fluid h="100vh" ta="center">
      <Center h="100%">
        <Stack w="24rem" mx="auto">
          <Title order={1}>Todo Lists</Title>

          {todoListsQuery.data?.length === 0 ? (
            <Text size="h2">No todo lists</Text>
          ) : (
            <Stack>
              {todoListsQuery.data?.map((todoList) => (
                <TodoListItem
                  key={todoList.id}
                  todoList={todoList}
                  onUpdateComplete={todoListsQuery.refetch}
                />
              ))}
            </Stack>
          )}

          <Link href="/add">
            <Button variant="light" leftSection={<IconPlus size="1rem" />}>
              Add
            </Button>
          </Link>
        </Stack>
      </Center>
    </Container>
  );
}
