import { notifications } from "@mantine/notifications";
import useApi from "../../hooks/useApi";
import useTable from "../../hooks/useTable";
import promotionColumns from "../../utils/table/columns/promotion";
import promotions from "../../utils/table/itemActions/promotion";
import prepareColumns from "../../utils/table/prepareColumns";
import Table from "../../components/ui/Table/Table";
import { ADD_PROMOTION } from "../../constants/AppUrls";
import AddButton from "../../components/ui/AddButton";

const ViewPromotions = () => {
  const api = useApi();
  const state = useTable({
    endpoint: "/promotions",
  });

  const onEdit = (id, status) => {
    api
      .patch(`/promotions/${id}`, { isEnabled: status })
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
    source: promotionColumns,
    merge: [
      {
        accessorKey: "none",
        cell: promotions(onEdit),
      },
    ],
  });

  return (
    <Table
      state={state}
      columns={columns}
      title="Promotions"
      addButton={<AddButton to={ADD_PROMOTION}>Add now</AddButton>}
      showPaginate={false}
      showSearch={false}
    />
  );
};

export default ViewPromotions;
