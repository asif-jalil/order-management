import { Box, Card, Divider, Flex, Text, Title } from "@mantine/core";

const getSummery = (data) => [
  {
    title: "Items subtotal:",
    value: `$${data.grandTotal + data.discount}`,
  },
  ,
  {
    title: "Discount:",
    value: `-$${data.discount}`,
  },
  {
    title: "Shipping cost:",
    value: `$0`,
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
    <Card withBorder shadow="xs">
      <Card.Section bg="gray.0">
        <Title order={4} p="sm">
          Summery
        </Title>
      </Card.Section>
      <Box py="md">
        {getSummery(data).map((item, index) => (
          <SummeryRow key={index} item={item} />
        ))}
      </Box>
      <Divider my="sm" variant="dashed" />
      <Flex justify="space-between" py="md">
        <Title order={4}>Total:</Title>
        <Title order={4}>${data.grandTotal}</Title>
      </Flex>
    </Card>
  );
};

export default Summery;
