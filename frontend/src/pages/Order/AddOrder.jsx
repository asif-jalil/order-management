import { Grid, Title } from "@mantine/core";
import { useForm } from "@mantine/form";
import Cart from "../../components/Order/Cart";

const AddOrder = () => {
  const form = useForm({
    initialValues: {
      shippingAddress: "",
      promotionId: null,
      orderItems: [{ productId: null, quantity: null }],
    },
  });

  return (
    <>
      <Title order={2} mb={28}>
        Add order
      </Title>

      <Grid mt={20}>
        <Grid.Col span={8}>
          <Cart form={form} />
        </Grid.Col>
      </Grid>
    </>
  );
};

export default AddOrder;
