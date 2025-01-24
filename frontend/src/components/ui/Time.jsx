import { Text } from "@mantine/core";
import moment from "moment";

const Time = ({ time, ...rest }) => {
  return (
    <Text fz={14} {...rest}>
      {moment(time).format("MMM DD YYYY, hh:mm a")}
    </Text>
  );
};

export default Time;
