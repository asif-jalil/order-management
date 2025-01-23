import { Button } from "@mantine/core";
import { IconPlus } from "@tabler/icons-react";
import { NavLink } from "react-router-dom";

const AddButton = ({ to, children }) => (
  <Button
    component={NavLink}
    to={to}
    variant="outline"
    mb={0}
    leftSection={<IconPlus size={14} />}
  >
    {children}
  </Button>
);

export default AddButton;
