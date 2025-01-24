import { useEffect, useMemo, useState } from "react";
import calculateDiscount from "../../utils/calculateDiscount";
import {
  ActionIcon,
  Anchor,
  Box,
  NumberInput,
  Popover,
  Select,
  Table,
} from "@mantine/core";
import { IconCircleMinus, IconPencil } from "@tabler/icons-react";

const ChooseProduct = ({
  form,
  products,
  onSearch,
  index,
  setProductCache,
  onAddEmpty,
}) => {
  const handleOnChange = (value) => {
    const product = products.find((prod) => prod.id === Number(value));
    setProductCache((prevCache) => {
      const newCache = new Map(prevCache);
      newCache.set(product.id, product);
      return newCache;
    });

    const foundIndex = form.values.orderItems.findIndex(
      (item) => Number(item.productId) === Number(value)
    );

    if (foundIndex >= 0) {
      const quantity = form.values.orderItems[foundIndex].quantity;
      form.setFieldValue(`orderItems.${foundIndex}.quantity`, quantity + 1);
    } else {
      form.setFieldValue(`orderItems.${index}.productId`, Number(value));
      form.setFieldValue(`orderItems.${index}.quantity`, 1);

      const empty = form.values.orderItems.filter((item) => !item.productId);

      if (empty.length <= 1) {
        onAddEmpty();
      }
    }
  };

  return (
    <Popover width={300} trapFocus withArrow shadow="md">
      <Popover.Target>
        <Anchor fz={14}>
          <IconPencil size={14} /> Choose product
        </Anchor>
      </Popover.Target>
      <Popover.Dropdown>
        <Select
          data={products.map((prod) => ({
            value: prod.id.toString(),
            label: prod.name,
          }))}
          searchable
          checkIconPosition="right"
          placeholder="Choose a product"
          onSearchChange={onSearch}
          flex={1}
          {...form.getInputProps(`orderItems.${index}.productId`)}
          onChange={handleOnChange}
        />
      </Popover.Dropdown>
    </Popover>
  );
};

const CartItem = ({
  form,
  index,
  order,
  products,
  promotion,
  onSearch,
  productCache,
  setProductCache,
  onAddEmpty,
}) => {
  const [discount, setDiscount] = useState(0);
  const product = productCache.get(Number(order.productId));

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

  const removeProduct = (index) => {
    form.removeListItem("orderItems", index);
  };

  return (
    <Table.Tr>
      <Table.Th>
        <ActionIcon
          variant="subtle"
          color="red"
          onClick={() => removeProduct(index)}
        >
          <IconCircleMinus size={16} />
        </ActionIcon>
      </Table.Th>
      <Table.Td>
        {product?.name || (
          <ChooseProduct
            form={form}
            products={products}
            onSearch={onSearch}
            index={index}
            setProductCache={setProductCache}
            onAddEmpty={onAddEmpty}
          />
        )}
      </Table.Td>
      <Table.Td>{product?.price ? `${product?.price}` : "-"}</Table.Td>
      <Table.Td>
        <Box w={50}>
          <NumberInput
            allowDecimal={false}
            allowNegative={false}
            size="xs"
            width={35}
            {...form.getInputProps(`orderItems.${index}.quantity`)}
            onChange={(value) => {
              form.setFieldValue(`orderItems.${index}.quantity`, Number(value));
            }}
          />
        </Box>
      </Table.Td>
      <Table.Td>{basePrice ? `$${basePrice}` : "-"}</Table.Td>
      <Table.Td>{discount ? `$${discount}` : "-"}</Table.Td>
      <Table.Td align="right">${Math.max(basePrice - discount, 0)}</Table.Td>
    </Table.Tr>
  );
};

export default CartItem;
