import { Box, Grid, Title } from "@mantine/core";
import { useParams } from "react-router-dom";
import useDataTable from "../../hooks/useDataTable";
import prepareColumns from "../../utils/table/prepareColumns";
import orderItemColumns from "../../utils/table/columns/orderItem";
import DataTable from "../../components/ui/Table/DataTable";
import Time from "../../components/ui/Time";
import Summery from "../../components/Order/Summery";
import ShippingInfo from "../../components/Order/ShippingInfo";

const ViewOrder = () => {
  const params = useParams();

  const state = useDataTable({
    endpoint: `/orders/${params.id}`,
    path: "orderItems",
  });

  const columns = prepareColumns({
    source: orderItemColumns,
  });

  return (
    <>
      <Box mb={30}>
        <Title>Order #{state.result?.data.id}</Title>
        <Time time={state.result?.data.createdAt} c="dimmed" />
      </Box>
      <ShippingInfo state={state} mb="xl" />
      <Grid>
        <Grid.Col span={{ lg: 9 }}>
          <DataTable
            state={state}
            columns={columns}
            showSearch={false}
            showPaginate={false}
          />
        </Grid.Col>
        <Grid.Col span={{ lg: 3 }}>
          <Summery data={state.result?.data} />
        </Grid.Col>
      </Grid>
    </>
  );
};

export default ViewOrder;
