import { Button, Group, Select, SimpleGrid, TextInput } from "@mantine/core";
import { DateInput } from "@mantine/dates";

const EditPromotionForm = ({ form, onEdit }) => {
  return (
    <form onSubmit={form.onSubmit(onEdit)}>
      <SimpleGrid cols={1} spacing="md">
        <TextInput
          label="Title"
          placeholder="Enter promotion title"
          withAsterisk
          {...form.getInputProps("title")}
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
      </SimpleGrid>
      <Group mt="md">
        <Button type="submit">Save & exit</Button>
      </Group>
    </form>
  );
};

export default EditPromotionForm;
