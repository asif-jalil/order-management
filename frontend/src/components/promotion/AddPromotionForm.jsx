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
import { FIXED, PERCENTAGE, WEIGHTED } from "../../constants/PromotionTypes";
import { DateInput } from "@mantine/dates";
import {
  IconCurrencyDollar,
  IconPercentage,
  IconPlus,
  IconTrash,
} from "@tabler/icons-react";

const AddPromotionForm = ({ form, onAdd }) => {
  const addDiscount = () => {
    form.insertListItem("discounts", {
      minQuantity: null,
      maxQuantity: null,
      discount: null,
    });
  };

  const removeDiscount = (index) => {
    form.removeListItem("discounts", index);
  };

  return (
    <form onSubmit={form.onSubmit(onAdd)}>
      <SimpleGrid cols={1} spacing="md">
        <TextInput
          label="Title"
          placeholder="Enter promotion title"
          withAsterisk
          {...form.getInputProps("title")}
        />
        <Select
          label="Type"
          withAsterisk
          data={[
            { value: PERCENTAGE, label: "Percentage" },
            { value: FIXED, label: "Fixed" },
            { value: WEIGHTED, label: "Weighted" },
          ]}
          checkIconPosition="right"
          placeholder="Choose promotion type"
          clearable
          {...form.getInputProps("type")}
        />
        <SimpleGrid cols={{ base: 1, xs: 2, md: 2 }}>
          <DateInput
            label="Starts At"
            placeholder="Enter start date"
            withAsterisk
            clearable
            {...form.getInputProps("startsAt")}
          />
          <DateInput
            label="Ends At"
            placeholder="Enter end date"
            withAsterisk
            clearable
            {...form.getInputProps("endsAt")}
          />
        </SimpleGrid>

        {form.values.type && form.values.type !== WEIGHTED && (
          <NumberInput
            label="Discount"
            placeholder="Enter discount amount"
            withAsterisk
            size="sm"
            leftSection={
              form.values.type === PERCENTAGE ? (
                <IconPercentage size={16} />
              ) : (
                <IconCurrencyDollar size={16} />
              )
            }
            {...form.getInputProps(`discounts.0.discount`)}
          />
        )}

        {form.values.type === WEIGHTED &&
          form.values.discounts.map((discount, index) => (
            <Flex gap="md" align="flex-start" key={index}>
              <NumberInput
                label="Min Quantity"
                placeholder="Enter minimum"
                withAsterisk
                flex={1}
                {...form.getInputProps(`discounts.${index}.minQuantity`)}
              />
              <NumberInput
                label="Max Quantity"
                placeholder="Enter maximum"
                withAsterisk
                flex={1}
                {...form.getInputProps(`discounts.${index}.maxQuantity`)}
              />
              <NumberInput
                label="Discount"
                placeholder="Enter discount amount"
                withAsterisk
                size="sm"
                flex={1}
                leftSection={
                  form.values.type === PERCENTAGE ? (
                    <IconPercentage size={16} />
                  ) : (
                    <IconCurrencyDollar size={16} />
                  )
                }
                {...form.getInputProps(`discounts.${index}.discount`)}
              />
              {index !== form.values.discounts.length - 1 &&
                form.values.discounts.length > 1 && (
                  <ActionIcon
                    variant="outline"
                    color="red"
                    onClick={() => removeDiscount(index)}
                    size="lg"
                    mt={24}
                  >
                    <IconTrash size={16} />
                  </ActionIcon>
                )}

              {index === form.values.discounts.length - 1 && (
                <ActionIcon
                  variant="outline"
                  onClick={addDiscount}
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
        <Button type="submit">Add promotion</Button>
        <Button
          onClick={() => onAdd(form.getValues(), null, true)}
          variant="outline"
        >
          Add promotion & exit
        </Button>
      </Group>
    </form>
  );
};

export default AddPromotionForm;
