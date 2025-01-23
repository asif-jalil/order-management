import { Badge, Box } from "@mantine/core";
import Time from "../../../components/ui/Time";
import PromotionType from "../../../components/promotion/PromotionType";
import { PERCENTAGE } from "../../../constants/PromotionTypes";

const promotionColumns = [
  {
    accessorKey: "title",
    header: "Title",
    size: 150,
  },
  {
    accessorKey: "type",
    header: "Type",
    size: 80,
    cell: (info) => <PromotionType type={info.getValue()} />,
  },
  {
    accessorKey: "startsAt",
    header: "Start At",
    size: 100,
    cell: (info) => <Time time={info.getValue()} />,
  },
  {
    accessorKey: "endsAt",
    header: "Ends At",
    size: 100,
    cell: (info) => <Time time={info.getValue()} />,
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
    accessorKey: "minQuantity",
    header: "Min Quantity",
    size: 70,
    cell: (info) => {
      const promotionDiscount = info.row.original.promotionDiscount;
      return promotionDiscount.map((promo, index) => (
        <Box key={index} mb={8}>
          {promo.minQuantity || 0}
        </Box>
      ));
    },
  },
  {
    accessorKey: "maxQuantity",
    header: "Max Quantity",
    size: 70,
    cell: (info) => {
      const promotionDiscount = info.row.original.promotionDiscount;
      return promotionDiscount.map((promo, index) => (
        <Box key={index} mb={8}>
          {promo.maxQuantity || "Unlimited"}
        </Box>
      ));
    },
  },
  {
    accessorKey: "discount",
    header: "Discount",
    size: 70,
    cell: (info) => {
      const promotionDiscount = info.row.original.promotionDiscount;
      const type = info.row.original.type;
      return promotionDiscount.map((promo, index) => (
        <Box key={index} mb={8}>
          {type !== PERCENTAGE && "$"}
          {promo.discount}
          {type === PERCENTAGE && "%"}
        </Box>
      ));
    },
  },
  {
    accessorKey: "none",
    header: "",
    size: 55,
  },
];

export default promotionColumns;
