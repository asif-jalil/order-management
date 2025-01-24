import {
  Button,
  Card,
  Divider,
  Flex,
  Group,
  Modal,
  Select,
  Table,
  Text,
  TextInput,
} from "@mantine/core";
import { useDebouncedCallback, useDisclosure } from "@mantine/hooks";
import CartItem from "./CartItem";
import { useCallback, useEffect, useMemo, useState } from "react";
import calculateDiscount from "../../utils/calculateDiscount";
import useApi from "../../hooks/useApi";
import { notifications } from "@mantine/notifications";
import { VIEW_ORDER } from "../../constants/AppUrls";
import { useNavigate } from "react-router-dom";

const Summery = ({ subtotal, discount, onAdd }) => (
  <Flex justify="space-between">
    <Button onClick={onAdd}>Add product</Button>
    <Flex>
      <Table variant="vertical" withTableBorder>
        <Table.Tbody>
          <Table.Tr>
            <Table.Th>Subtotal</Table.Th>
            <Table.Td align="right" c="gray.7" fw={500}>
              ${subtotal}
            </Table.Td>
          </Table.Tr>
          <Table.Tr>
            <Table.Th>Discount</Table.Th>
            <Table.Td align="right" c="gray.7" fw={500}>
              ${discount}
            </Table.Td>
          </Table.Tr>
          <Table.Tr>
            <Table.Th>Total</Table.Th>
            <Table.Td align="right" fw={500} fz="lg">
              ${Math.max(subtotal - discount, 0)}
            </Table.Td>
            <Table.Td></Table.Td>
          </Table.Tr>
        </Table.Tbody>
      </Table>
    </Flex>
  </Flex>
);

const Cart = ({ form }) => {
  const [promotions, setPromotions] = useState([]);
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [productCache, setProductCache] = useState(new Map());
  const [opened, { open, close }] = useDisclosure(false);
  const api = useApi();
  const navigate = useNavigate();

  const promotion = promotions.find(
    (prom) => prom.id === Number(form.values.promotionId)
  );

  useEffect(() => {
    api
      .get("/promotions", {
        params: { filter: { isEnabled: true, hasNotExpired: true } },
      })
      .then((res) => res.data)
      .then((res) => {
        setPromotions(res.data.items);
      })
      .catch((error) => {
        notifications.show({
          color: "red",
          message: error.response.data.message,
        });
      });
  }, []);

  const fetchProducts = useCallback(() => {
    api
      .get("/products", {
        params: { perPage: 20, search, filter: { isEnabled: true } },
      })
      .then((res) => res.data)
      .then((res) => {
        setProducts(res.data.items);
        setSearch("");
      })
      .catch((error) => {
        notifications.show({
          message: error.response.data.message,
          color: "red",
        });
      });
  }, []);

  const handleSearch = useDebouncedCallback(() => {
    fetchProducts();
  }, 800);

  const handleSearchOnChange = (value) => {
    setSearch(value);
    handleSearch();
  };

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  const handleAddProduct = (values) => {
    api
      .post("/orders", {
        ...values,
        promotionId: parseInt(values.promotionId) || null,
        orderItems: values.orderItems
          .filter((item) => item.productId && item.quantity > 0)
          .map((item) => ({
            ...item,
            productId: parseInt(item.productId) || null,
          })),
      })
      .then((res) => res.data)
      .then((res) => {
        notifications.show({ message: res.message });
        form.reset();
        navigate(VIEW_ORDER.replace(":id", res.data.id));
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

  const addEmptyProduct = () => {
    form.insertListItem("orderItems", {
      productId: null,
      quantity: null,
    });
  };

  const totalDiscount = useMemo(
    () =>
      form.values.orderItems.reduce((acc, order) => {
        const product = productCache.get(Number(order.productId));
        if (!product) return acc;

        const promotion = promotions.find(
          (prom) => prom.id === Number(form.values.promotionId)
        );
        const basePrice = (product.price || 0) * (order.quantity || 0);
        const discount = calculateDiscount({
          promotion,
          weight: product.weight,
          quantity: order.quantity,
          basePrice,
        });

        return discount + acc;
      }, 0),
    [form.values]
  );

  const subtotal = useMemo(
    () =>
      form.values.orderItems.reduce((acc, order) => {
        const product = productCache.get(Number(order.productId));
        if (!product) return acc;

        return acc + (product.price || 0) * (order.quantity || 0);
      }, 0),
    [form.values]
  );

  return (
    <form>
      <Card withBorder mb="md">
        <Table.ScrollContainer minWidth={500} type="scrollarea">
          <Table>
            <Table.Thead>
              <Table.Tr>
                <Table.Th w={40}></Table.Th>
                <Table.Th>Product</Table.Th>
                <Table.Th>Unit price</Table.Th>
                <Table.Th>Quantity</Table.Th>
                <Table.Th>Subtotal</Table.Th>
                <Table.Th>Discount</Table.Th>
                <Table.Th align="right" style={{ textAlign: "right" }}>
                  Total
                </Table.Th>
              </Table.Tr>
            </Table.Thead>
            <Table.Tbody>
              {form.values.orderItems.map((order, index) => (
                <CartItem
                  key={index}
                  form={form}
                  order={order}
                  index={index}
                  promotion={promotion}
                  productCache={productCache}
                  products={products}
                  setProductCache={setProductCache}
                  onSearch={handleSearchOnChange}
                  onAddEmpty={addEmptyProduct}
                />
              ))}
            </Table.Tbody>
          </Table>
        </Table.ScrollContainer>

        <Divider my="md" />

        <Summery
          subtotal={subtotal}
          discount={totalDiscount}
          onAdd={addEmptyProduct}
        />
      </Card>

      <Flex justify="space-between">
        <Select
          data={promotions.map((promo) => ({
            value: promo.id.toString(),
            label: promo.title,
          }))}
          checkIconPosition="right"
          placeholder="Apply promo"
          clearable
          {...form.getInputProps("promotionId")}
        />
        <Button onClick={open}>Proceed to checkout</Button>
      </Flex>

      <Modal
        opened={opened}
        onClose={close}
        title="Process to checkout"
        centered
      >
        <Text mb="md">
          You are going to place and order. If you are sure to place the order
          please enter your shipping address below
        </Text>
        <TextInput
          label="Shipping Address"
          placeholder="Enter shipping address"
          withAsterisk
          {...form.getInputProps("shippingAddress")}
        />
        <Flex justify="flex-end" mt="md">
          <Group>
            <Button color="gray" onClick={close}>
              Cancel
            </Button>
            <Button onClick={form.onSubmit(handleAddProduct)}>
              Place order
            </Button>
          </Group>
        </Flex>
      </Modal>
    </form>
  );
};

export default Cart;
