import { Card, Divider, Flex, Text, Title } from "@mantine/core";

const getSummery = (result) => [
  {
    title: "Items subtotal:",
    value: `$${result?.data.grandTotal + result?.data.discount}`,
  },
  ,
  {
    title: "Discount:",
    value: `-$${result?.data.discount}`,
  },
  {
    title: "Shipping cost:",
    value: `$0`,
  },
];

const SummeryRow = ({ item }) => (
  <Flex justify="space-between" my={3}>
    <Text>{item.title}</Text>
    <Text>{item.value}</Text>
  </Flex>
);

const Summery = ({ state }) => {
  return (
    <Card withBorder shadow="xs">
      <Title order={3} mb="md">
        Summery
      </Title>
      {getSummery(state.result).map((item) => (
        <SummeryRow item={item} />
      ))}
      <Divider my="sm" variant="dashed" />
      <Flex justify="space-between" my={3}>
        <Title order={4}>Total:</Title>
        <Title order={4}>${state.result?.data.grandTotal}</Title>
      </Flex>
    </Card>
  );
};

export default Summery;
