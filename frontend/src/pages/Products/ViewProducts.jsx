import DataTable from "../../components/ui/Table/DataTable";
import productColumns from "../../utils/table/columns/product";
import prepareColumns from "../../utils/table/prepareColumns";
import products from "../../utils/table/itemActions/products";
import { ADD_PRODUCT } from "../../constants/AppUrls";
import useApi from "../../hooks/useApi";
import { notifications } from "@mantine/notifications";
import useDataTable from "../../hooks/useDataTable";
import AddButton from "../../components/ui/AddButton";

const ViewProducts = () => {
  const api = useApi();
  const state = useDataTable({
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
    <DataTable
      state={state}
      columns={columns}
      title="Products"
      addButton={<AddButton to={ADD_PRODUCT}>Add now</AddButton>}
    />
  );
};

export default ViewProducts;
