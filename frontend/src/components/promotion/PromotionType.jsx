import { Badge } from "@mantine/core";
import classNames from "classnames";
import { FIXED, PERCENTAGE, WEIGHTED } from "../../constants/PromotionTypes";

const PromotionType = ({ type }) => {
  return (
    <Badge
      variant="light"
      size="sm"
      radius="md"
      color={classNames({
        teal: type === FIXED,
        blue: type === PERCENTAGE,
        gray: type === WEIGHTED,
      })}
    >
      {type}
    </Badge>
  );
};

export default PromotionType;
