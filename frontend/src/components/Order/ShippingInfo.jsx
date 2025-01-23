import { Box, Text, Title } from "@mantine/core";

const ShippingInfo = ({ state, ...rest }) => {
  return (
    <Box {...rest}>
      <Title order={3} mb="xs">
        Shipping info
      </Title>
      <Text>
        <Text fw={500} component="span" mr={8}>
          Address:
        </Text>
        {state.result?.data.shippingAddress}
      </Text>
    </Box>
  );
};

export default ShippingInfo;
