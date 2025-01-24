import { Box, Card, Divider, Flex, Text, Title } from "@mantine/core";

const getSummery = (data) => [
  {
    title: "Items subtotal:",
    value: `$${data.subtotal}`,
  },
  ,
  {
    title: "Discount:",
    value: `-$${data.discount}`,
  },
];

const SummeryRow = ({ item }) => (
  <Flex justify="space-between" my="xs">
    <Text>{item.title}</Text>
    <Text>{item.value}</Text>
  </Flex>
);

const Summery = ({ data = {} }) => {
  return (
    <Card withBorder>
      <Title order={4}>Summery</Title>
      <Box py="md">
        {getSummery(data).map((item, index) => (
          <SummeryRow key={index} item={item} />
        ))}
      </Box>
      <Divider variant="dashed" />
      <Flex justify="space-between" py="md">
        <Title order={4}>Total:</Title>
        <Title order={4}>${Math.max(data.subtotal - data.discount, 0)}</Title>
      </Flex>
    </Card>
  );
};

export default Summery;
