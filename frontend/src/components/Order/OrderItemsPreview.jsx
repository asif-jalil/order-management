import { Box, Card, Divider, Flex, Text, Title } from "@mantine/core";
import { useEffect, useMemo, useState } from "react";
import calculateDiscount from "../../utils/calculateDiscount";

const ProductLine = ({ order, products, promotion, isLast }) => {
  const [discount, setDiscount] = useState(0);
  const product = products.get(Number(order.productId));

  const basePrice = useMemo(
    () => (product?.price || 0) * (order.quantity || 0),
    [product, order]
  );

  useEffect(() => {
    const dis = calculateDiscount({
      promotion,
      weight: product?.weight || 0,
      quantity: order.quantity,
      basePrice,
    });
    setDiscount(dis);
  }, [product, order, promotion]);

  if (!product) return;

  return (
    <>
      <Flex py={16} justify="space-between">
        <Box>
          <Title order={5} c="gray.7">
            {product.name} x {order.quantity}
          </Title>
          <Flex align="center" gap="xs">
            <Text c="dimmed" fz={12}>
              Unit price: ${product.price}
            </Text>
            <Divider orientation="vertical" size="sm" />
            <Text c="dimmed" fz={12}>
              Sub total: ${basePrice}
            </Text>
            <Divider orientation="vertical" size="sm" />
            <Text c="dimmed" fz={12}>
              Discount: ${discount}
            </Text>
          </Flex>
        </Box>
        <Title order={5}>${Math.max(basePrice - discount, 0)}</Title>
      </Flex>
      {!isLast && <Divider my="sm" />}
    </>
  );
};

const OrderItemsPreview = ({ form, products, promotion }) => {
  return (
    <Card withBorder>
      <Card.Section bg="gray.0">
        <Title order={4} p="sm">
          Ordered products
        </Title>
      </Card.Section>

      {form.values.orderItems.map((order, index, array) => (
        <ProductLine
          key={index}
          order={order}
          promotion={promotion}
          products={products}
          isLast={index === array.length - 1}
        />
      ))}
    </Card>
  );
};

export default OrderItemsPreview;
