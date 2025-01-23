import { Card, Center, Stack, Text, ThemeIcon } from "@mantine/core";
import { IconAlertTriangle } from "@tabler/icons-react";

const EmptyTable = () => {
  return (
    <Card withBorder p={0} mt={6}>
      <Center h={200}>
        <Stack align="center" spacing="xs">
          <ThemeIcon size={48} radius="xl" variant="light" color="gray">
            <IconAlertTriangle size={32} />
          </ThemeIcon>
          <Text size="lg" weight={500} c="dark" fw={500}>
            Nothing found
          </Text>
          <Text size="sm" c="dimmed">
            We couldn’t find anything with that term. Please try again.
          </Text>
        </Stack>
      </Center>
    </Card>
  );
};

export default EmptyTable;
