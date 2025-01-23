const prepareColumns = ({
  source = [],
  merge = [],
  exclude = [],
  append = [],
}) => {
  const excluded = source.filter(
    (column) => !exclude.includes(column.accessorKey)
  );

  const merged = excluded.map((column) => {
    const found = merge.findIndex(
      (m) => m.accessorKey && m.accessorKey === column.accessorKey
    );
    if (found < 0) {
      return column;
    }
    return { ...column, ...merge[found] };
  });

  const included = merged.concat(append);

  return included;
};

export default prepareColumns;
