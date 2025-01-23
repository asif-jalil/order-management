import { SimpleGrid, Text } from "@mantine/core";
import StatCard from "../../components/ui/StatCard";

const stats = [
  {
    label: "Total Products",
    value: 120,
    color: "green",
  },
  {
    label: "Total Orders",
    value: 320,
    color: "orange",
  },
  {
    label: "Total Promotions",
    value: 75,
    color: "blue",
  },
];

const Dashboard = () => {
  return (
    <>
      <Text c="dimmed" size="md" fw={500} mb={12}>
        First sight summery
      </Text>
      <SimpleGrid
        cols={{ base: 1, xs: 2, sm: 1, md: 2, lg: 3, xl: 4 }}
        spacing="lg"
      >
        {stats.map((stat, index) => (
          <StatCard key={index} stat={stat} />
        ))}
      </SimpleGrid>
    </>
  );
};

export default Dashboard;
