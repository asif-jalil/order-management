import {
  Button,
  Group,
  NumberInput,
  Select,
  SimpleGrid,
  Text,
  Textarea,
  TextInput,
} from "@mantine/core";
import { IconCoin } from "@tabler/icons-react";

const EditProductForm = ({ form, onEdit }) => {
  return (
    <form onSubmit={form.onSubmit(onEdit)}>
      <SimpleGrid cols={1} spacing="md">
        <TextInput
          label="Name"
          placeholder="Enter product name"
          {...form.getInputProps("name")}
        />
        <SimpleGrid cols={{ base: 1, xs: 2, md: 2 }}>
          <NumberInput
            label="Price"
            placeholder="Enter price in USD"
            min={0}
            step={0.01}
            precision={2}
            rightSection={<IconCoin size={16} />}
            {...form.getInputProps("price")}
          />
          <NumberInput
            label="Weight"
            placeholder="Enter weight in grams"
            min={0}
            step={1}
            rightSection={<Text fz={14}>gm</Text>}
            {...form.getInputProps("weight")}
          />
        </SimpleGrid>
        <Select
          label="Enabled"
          data={[
            { value: "true", label: "Yes" },
            { value: "", label: "No" },
          ]}
          checkIconPosition="right"
          {...form.getInputProps("isEnabled")}
          value={form.getValues().isEnabled ? "true" : ""}
          onChange={(value) => form.setFieldValue("isEnabled", !!value)}
        />
        <Textarea
          label="Description"
          placeholder="Enter product description"
          minRows={5}
          {...form.getInputProps("description")}
        />
      </SimpleGrid>
      <Group mt="md">
        <Button type="submit">Save & exit</Button>
      </Group>
    </form>
  );
};

export default EditProductForm;
