import {
  Table as MTable,
  Pagination,
  Skeleton,
  Card,
  Flex,
  Box,
  Title,
  Text,
  Select,
  TextInput,
} from "@mantine/core";
import EmptyTable from "./EmptyTable";
import {
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import OverlayLoader from "../OverlayLoader";
import { useDebouncedCallback } from "@mantine/hooks";
import { useState } from "react";
import { IconSearch } from "@tabler/icons-react";

const DataTable = ({
  state,
  columns,
  title,
  addButton,
  showSearch = true,
  showPaginate = true,
}) => {
  const [search, setSearch] = useState("");
  const table = useReactTable({
    data: state.data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  const handleSearch = useDebouncedCallback(() => {
    state.fetchData(state.getRequestQuery({ search }));
  }, 800);

  const handleOnChange = (event) => {
    setSearch(event.target.value);
    handleSearch();
  };

  return (
    <Box>
      {(title || showSearch) && (
        <Flex
          gap="md"
          mb={28}
          align="center"
          justify="space-between"
          direction={{ base: "column", xs: "row" }}
        >
          {title && (
            <Flex gap="md">
              <Title order={2}>{title}</Title>
              {addButton && addButton}
            </Flex>
          )}
          {showSearch && (
            <Flex>
              <TextInput
                value={search}
                onChange={handleOnChange}
                leftSection={<IconSearch size={16} />}
                placeholder="Search here..."
              />
            </Flex>
          )}
        </Flex>
      )}
      <OverlayLoader show={state.loading && table.getRowCount() > 0}>
        <Card withBorder p={0} style={{ overflowX: "auto" }}>
          <MTable>
            <MTable.Thead style={{ outline: "none" }} bg="gray.0">
              {table.getHeaderGroups().map((headerGroup) => (
                <MTable.Tr key={headerGroup.id}>
                  {headerGroup.headers.map((header) => (
                    <MTable.Th
                      py={12}
                      key={header.id}
                      style={{ minWidth: header.getSize() }}
                      fw={500}
                    >
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </MTable.Th>
                  ))}
                </MTable.Tr>
              ))}
            </MTable.Thead>
            <MTable.Tbody>
              {table.getRowCount() === 0 && !state.loading && (
                <MTable.Tr>
                  <MTable.Td colSpan={columns.length}>
                    <EmptyTable />
                  </MTable.Td>
                </MTable.Tr>
              )}

              {table.getRowCount() === 0 &&
                state.loading &&
                ["100%", "60%", "80%", "50%"].map((width, index) => (
                  <MTable.Tr key={index}>
                    <MTable.Td colSpan={columns.length}>
                      <Skeleton height={8} mt={6} width={width} radius="xl" />
                    </MTable.Td>
                  </MTable.Tr>
                ))}

              {table.getRowCount() > 0 &&
                table.getRowModel().rows.map((row) => (
                  <MTable.Tr key={row.id}>
                    {row.getVisibleCells().map((cell) => (
                      <MTable.Td
                        key={cell.id}
                        style={{ minWidth: cell.column.getSize() }}
                        c="dimmed"
                        fz={14}
                        py={12}
                      >
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
                      </MTable.Td>
                    ))}
                  </MTable.Tr>
                ))}
            </MTable.Tbody>
          </MTable>
        </Card>
      </OverlayLoader>

      {showPaginate && table.getRowCount() > 0 && (
        <Flex justify="space-between" gap="md" mt="md">
          <Flex gap="md" align="center">
            <Text>View</Text>
            <Box w={70}>
              <Select
                checkIconPosition="right"
                data={["5", "10", "15", "25", "50"]}
                value={state.perPage.toString()}
                onChange={(value) =>
                  state.fetchData(
                    state.getRequestQuery({ perPage: Number(value) })
                  )
                }
              />
            </Box>
            <Text>Records</Text>
          </Flex>
          <Flex gap="md" align="center">
            <Text>{state.meta.totalCount} records</Text>
            <Pagination
              total={state.meta.pageCount}
              page={state.meta.currentPage}
              onChange={(page) =>
                state.fetchData(state.getRequestQuery({ page }))
              }
              position="center"
            />
          </Flex>
        </Flex>
      )}
    </Box>
  );
};

export default DataTable;
