import AddButton from "../../components/ui/AddButton";
import DataTable from "../../components/ui/Table/DataTable";
import { ADD_ORDER } from "../../constants/AppUrls";
import useDataTable from "../../hooks/useDataTable";
import orderColumn from "../../utils/table/columns/orders";
import prepareColumns from "../../utils/table/prepareColumns";

const ViewOrders = () => {
  const state = useDataTable({
    endpoint: "/orders",
  });

  const columns = prepareColumns({
    source: orderColumn,
  });

  return (
    <DataTable
      state={state}
      columns={columns}
      title="Orders"
      showSearch={false}
      addButton={<AddButton to={ADD_ORDER}>Add now</AddButton>}
    />
  );
};

export default ViewOrders;
