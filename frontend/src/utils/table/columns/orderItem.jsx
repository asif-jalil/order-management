const orderItemColumns = [
  {
    accessorKey: "product.name",
    header: "Products",
    size: 150,
  },
  {
    accessorKey: "unitPrice",
    header: "Unit price",
    size: 100,
  },
  {
    accessorKey: "quantity",
    header: "Quantity",
    size: 80,
  },
  {
    accessorKey: "total",
    header: "Total",
    size: 80,
    cell: (info) => {
      const original = info.row.original;
      return original.unitPrice * original.quantity;
    },
  },
  {
    accessorKey: "discount",
    header: "Discount",
    size: 80,
  },
];

export default orderItemColumns;
