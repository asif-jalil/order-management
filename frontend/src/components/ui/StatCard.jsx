import { Card, Text } from "@mantine/core";

const StatCard = ({ stat }) => {
  return (
    <Card withBorder padding="lg" radius="md">
      <Text size="xl">{stat.label}</Text>
      <Text size="36px" fw={500} c={stat.color}>
        {stat.value}
      </Text>
    </Card>
  );
};

export default StatCard;
