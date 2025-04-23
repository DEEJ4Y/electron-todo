import {
  Container,
  Center,
  Stack,
  Title,
  Button,
  TextInput,
  ActionIcon,
} from "@mantine/core";
import {
  IconArrowLeft,
  IconDeviceFloppy,
  IconPlus,
  IconTrash,
} from "@tabler/icons-react";
import { useForm } from "@mantine/form";
import MarkdownEditor from "@/components/inputs/MarkdownEditor";
import Link from "next/link";
import { notifications } from "@mantine/notifications";
import { useRouter } from "next/router";

export default function AddTodoListPage() {
  const router = useRouter();
  const form = useForm({
    initialValues: {
      title: "",
      currItem: "",
      items: [] as string[],
    },

    validate: {
      title: (value) => (value.length > 0 ? null : "Title is required"),
      items: (value) =>
        value.length > 0 ? null : "At least one item is required",
    },

    validateInputOnChange: true,
    validateInputOnBlur: true,
  });

  const onSubmit = async () => {
    try {
      if (form.values.currItem.length > 0) {
        form.insertListItem("items", form.values.currItem);
        form.setFieldValue("currItem", "");
      }

      const data = form.validate();
      if (data.hasErrors) {
        return notifications.show({
          title: "Error",
          message: "Please fill in all the required fields",
          color: "red",
        });
      }

      const addedList = await window.electronAPI["todoLists:add"]({
        title: form.values.title,
        items: form.values.items,
      });

      router.push("/");
    } catch (error) {
      console.error(error);
      notifications.show({
        title: "Error",
        message: "Something went wrong",
        color: "red",
      });
    }
  };

  return (
    <Container fluid h="100vh">
      <Center h="100%">
        <Stack>
          <Title order={1} ta="center" w="32rem" mx="auto">
            Add Todo List
          </Title>

          <TextInput label="List Title" {...form.getInputProps("title")} />

          <form
            onSubmit={(e) => {
              e.preventDefault();

              if (form.values.currItem.length > 0) {
                form.insertListItem("items", form.values.currItem);
                form.setFieldValue("currItem", "");
              }
            }}
          >
            <Stack mb="-16px">
              <TextInput label="Item" {...form.getInputProps("currItem")} />

              <Button
                type="submit"
                variant="subtle"
                leftSection={<IconPlus size="1rem" />}
              >
                Add Item
              </Button>
            </Stack>
          </form>

          <Stack>
            {form.values.items.map((item, index) => (
              <TextInput
                key={index}
                label={`Item ${index + 1}`}
                rightSection={
                  <ActionIcon
                    variant="subtle"
                    onClick={() => form.removeListItem("items", index)}
                  >
                    <IconTrash className="action-icon" />
                  </ActionIcon>
                }
                {...form.getInputProps(`items.${index}`)}
              />
            ))}
          </Stack>

          <Button
            leftSection={<IconDeviceFloppy size="1rem" />}
            disabled={!form.isValid()}
            onClick={onSubmit}
          >
            Save
          </Button>

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
