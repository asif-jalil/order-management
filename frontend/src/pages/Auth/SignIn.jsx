import {
  Button,
  Container,
  Paper,
  PasswordInput,
  Stack,
  TextInput,
  Title,
  Text,
  Group,
  Divider,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import useApi from "../../hooks/useApi";
import { useDispatch } from "react-redux";
import { authActions } from "../../store/reducers/authReducer";
import { notifications } from "@mantine/notifications";

const SignIn = () => {
  const api = useApi();
  const dispatch = useDispatch();
  const form = useForm({
    initialValues: {
      email: "",
      password: "",
    },
  });

  const handleSubmit = (values) => {
    api
      .post("/auth/login", values)
      .then((res) => res.data)
      .then((res) => {
        dispatch(authActions.signin(res.data));
      })
      .catch((error) => {
        if (error.response.data.message) {
          notifications.show({
            color: "red",
            message: error.response.data.message,
          });
        }

        form.setErrors(error.response.data);
      });
  };

  return (
    <Container size={420} my={60}>
      <Title align="center" mb="xs" order={1} sx={{ fontWeight: 700 }}>
        Welcome Back!
      </Title>
      <Text align="center" size="sm" c="dimmed" mb="lg">
        Sign in to access your account and manage your tasks.
      </Text>

      <Paper withBorder shadow="lg" radius="md" p="xl">
        <form onSubmit={form.onSubmit(handleSubmit)}>
          <Stack spacing="md">
            <TextInput
              label="Email Address"
              placeholder="Enter your email"
              size="md"
              radius="md"
              withAsterisk
              {...form.getInputProps("email")}
            />
            <PasswordInput
              label="Password"
              placeholder="Enter your password"
              size="md"
              radius="md"
              withAsterisk
              {...form.getInputProps("password")}
            />
            <Group position="apart" mt="xs">
              <Text size="xs" color="dimmed">
                Make sure your password is secure.
              </Text>
            </Group>
            <Button fullWidth type="submit" size="md" radius="md" mt="md">
              Sign In
            </Button>
          </Stack>
        </form>
        <Divider my="lg" label="Or" labelPosition="center" />
        <Button
          variant="outline"
          fullWidth
          size="md"
          radius="md"
          mt="xs"
          color="blue"
          disabled
        >
          Continue with Google
        </Button>
      </Paper>
    </Container>
  );
};

export default SignIn;
