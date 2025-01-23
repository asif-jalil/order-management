import {
  Button,
  Group,
  NumberInput,
  SimpleGrid,
  Text,
  Textarea,
  TextInput,
} from "@mantine/core";
import { IconCurrencyDollar } from "@tabler/icons-react";

const AddProductForm = ({ form, onAdd }) => {
  return (
    <form onSubmit={form.onSubmit(onAdd)}>
      <SimpleGrid cols={1} spacing="md">
        <TextInput
          label="Name"
          placeholder="Enter product name"
          withAsterisk
          {...form.getInputProps("name")}
        />
        <SimpleGrid cols={{ base: 1, xs: 2, md: 2 }}>
          <NumberInput
            label="Price"
            placeholder="Enter price in USD"
            withAsterisk
            min={0}
            step={0.01}
            precision={2}
            leftSection={<IconCurrencyDollar size={16} />}
            {...form.getInputProps("price")}
          />
          <NumberInput
            label="Weight"
            placeholder="Enter weight in grams"
            withAsterisk
            min={0}
            step={1}
            leftSection={<Text fz={14}>gm</Text>}
            {...form.getInputProps("weight")}
          />
        </SimpleGrid>
        <Textarea
          label="Description"
          placeholder="Enter product description"
          minRows={5}
          {...form.getInputProps("description")}
        />
      </SimpleGrid>
      <Group mt="md">
        <Button type="submit">Add product</Button>
        <Button
          onClick={() => onAdd(form.getValues(), null, true)}
          variant="outline"
        >
          Add product & exit
        </Button>
      </Group>
    </form>
  );
};

export default AddProductForm;
