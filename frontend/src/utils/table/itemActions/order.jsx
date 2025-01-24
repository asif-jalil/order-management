import { ActionIcon, Menu } from "@mantine/core";
import { IconDots } from "@tabler/icons-react";
import { NavLink } from "react-router-dom";
import { VIEW_ORDER } from "../../../constants/AppUrls";

const orders = (info) => {
  const original = info.row.original;

  return (
    <Menu width={150}>
      <Menu.Target>
        <ActionIcon variant="default">
          <IconDots style={{ width: "70%", height: "70%" }} stroke={1.5} />
        </ActionIcon>
      </Menu.Target>

      <Menu.Dropdown>
        <Menu.Item
          component={NavLink}
          to={VIEW_ORDER.replace(":id", original.id)}
        >
          View
        </Menu.Item>
      </Menu.Dropdown>
    </Menu>
  );
};

export default orders;
