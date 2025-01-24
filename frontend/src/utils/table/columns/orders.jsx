import { Anchor } from "@mantine/core";
import { Link } from "react-router-dom";
import { VIEW_ORDER } from "../../../constants/AppUrls";
import orders from "../itemActions/order";
import Time from "../../../components/ui/Time";

const orderColumn = [
  {
    accessorKey: "id",
    header: "Order ID",
    size: 100,
    cell: (info) => (
      <Anchor component={Link} to={VIEW_ORDER.replace(":id", info.getValue())}>
        {info.getValue()}
      </Anchor>
    ),
  },
  {
    accessorKey: "shippingAddress",
    header: "Shipping address",
    size: 250,
  },
  {
    accessorKey: "createdAt",
    header: "Order Created At",
    size: 150,
    cell: (info) => <Time time={info.getValue()} />,
  },
  {
    accessorKey: "subtotal",
    header: "Subtotal",
    size: 80,
    cell: (info) => info.row.original.grandTotal + info.row.original.discount,
  },
  {
    accessorKey: "discount",
    header: "Discount",
    size: 100,
  },
  {
    accessorKey: "grandTotal",
    header: "Grand total",
    size: 100,
  },
  {
    accessorKey: "none",
    header: "",
    size: 55,
    cell: orders,
  },
];

export default orderColumn;
