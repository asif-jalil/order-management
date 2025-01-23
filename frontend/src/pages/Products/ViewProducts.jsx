import Table from "../../components/ui/Table/Table";
import productColumns from "../../utils/table/columns/product";
import prepareColumns from "../../utils/table/prepareColumns";
import products from "../../utils/table/itemActions/products";
import { ADD_PRODUCT } from "../../constants/AppUrls";
import useApi from "../../hooks/useApi";
import { notifications } from "@mantine/notifications";
import useTable from "../../hooks/useTable";
import AddButton from "../../components/ui/AddButton";

const ViewProducts = () => {
  const api = useApi();
  const state = useTable({
    endpoint: "/products",
  });

  const onEdit = (id, status) => {
    api
      .patch(`/products/${id}`, { isEnabled: status })
      .then((res) => res.data)
      .then((res) => {
        notifications.show({ message: res.message });
        state.reloadData();
      })
      .catch((error) => {
        notifications.show({
          message: error.response.data.message,
          color: "red",
        });
      });
  };

  const columns = prepareColumns({
    source: productColumns,
    merge: [
      {
        accessorKey: "none",
        cell: products(onEdit),
      },
    ],
  });

  return (
    <Table
      state={state}
      columns={columns}
      title="Products"
      addButton={<AddButton to={ADD_PRODUCT}>Add now</AddButton>}
    />
  );
};

export default ViewProducts;
