import {
  ActionIcon,
  Button,
  Flex,
  Group,
  NumberInput,
  Select,
  SimpleGrid,
  TextInput,
} from "@mantine/core";
import { IconPlus, IconTrash } from "@tabler/icons-react";

const AddOrderForm = ({
  form,
  onAdd,
  products,
  promotions,
  onSearch,
  setProductCache,
}) => {
  const addEmptyProduct = () => {
    form.insertListItem("orderItems", {
      productId: null,
      quantity: null,
    });
  };

  const removeProduct = (index) => {
    form.removeListItem("orderItems", index);
  };

  return (
    <form onSubmit={form.onSubmit(onAdd)}>
      <SimpleGrid cols={1} spacing="md">
        <TextInput
          label="Shipping Address"
          placeholder="Enter shipping address"
          withAsterisk
          {...form.getInputProps("shippingAddress")}
        />
        <Select
          label="Choose promotion"
          withAsterisk
          data={promotions.map((promo) => ({
            value: promo.id.toString(),
            label: promo.title,
          }))}
          checkIconPosition="right"
          placeholder="Choose a promotion"
          clearable
          {...form.getInputProps("promotionId")}
        />

        {form.values.orderItems.map((item, index) => (
          <Flex gap="md" align="flex-start" key={index}>
            <Select
              label="Choose product"
              withAsterisk
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
              onOptionSubmit={(value) => {
                const product = products.find(
                  (prod) => prod.id === Number(value)
                );
                setProductCache((prevCache) => {
                  const newCache = new Map(prevCache);
                  newCache.set(product.id, product);
                  return newCache;
                });
                form.setFieldValue(
                  `orderItems.${index}.productId`,
                  Number(value)
                );
              }}
            />
            <NumberInput
              label="Quantity"
              placeholder="Enter quantity"
              withAsterisk
              flex={1}
              allowDecimal={false}
              allowNegative={false}
              disabled={!item.productId}
              {...form.getInputProps(`orderItems.${index}.quantity`)}
              onChange={(value) => {
                form.setFieldValue(
                  `orderItems.${index}.quantity`,
                  Number(value)
                );
              }}
            />

            {index !== form.values.orderItems.length - 1 &&
              form.values.orderItems.length > 1 && (
                <ActionIcon
                  variant="outline"
                  color="red"
                  onClick={() => removeProduct(index)}
                  size="lg"
                  mt={24}
                >
                  <IconTrash size={16} />
                </ActionIcon>
              )}

            {index === form.values.orderItems.length - 1 && (
              <ActionIcon
                variant="outline"
                onClick={addEmptyProduct}
                size="lg"
                mt={24}
              >
                <IconPlus size={16} />
              </ActionIcon>
            )}
          </Flex>
        ))}
      </SimpleGrid>
      <Group mt="xl">
        <Button type="submit">Add order</Button>
        <Button
          onClick={() => onAdd(form.getValues(), null, true)}
          variant="outline"
        >
          Add order & exit
        </Button>
      </Group>
    </form>
  );
};

export default AddOrderForm;
