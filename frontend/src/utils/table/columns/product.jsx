import { Badge } from "@mantine/core";
import Truncate from "../../../components/ui/Table/Truncate";

const productColumns = [
  {
    accessorKey: "name",
    header: "Name",
    size: 150,
  },
  {
    accessorKey: "price",
    header: "Price",
    size: 80,
    cell: (info) => `$${info.getValue()}`,
  },
  {
    accessorKey: "weight",
    header: "Weight",
    size: 80,
    cell: (info) => `${info.getValue()} gm`,
  },
  {
    accessorKey: "isEnabled",
    header: "Status",
    size: 100,
    cell: (info) => (
      <Badge
        variant="light"
        size="sm"
        radius="md"
        color={info.getValue() ? "teal" : "pink"}
      >
        {info.getValue() ? "Enabled" : "Disabled"}
      </Badge>
    ),
  },
  {
    accessorKey: "description",
    header: "Description",
    size: 250,
    cell: (info) => <Truncate text={info.getValue()} />,
  },
  {
    accessorKey: "none",
    header: "",
    size: 55,
  },
];

export default productColumns;
