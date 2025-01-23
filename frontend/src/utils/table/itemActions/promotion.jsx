import { ActionIcon, Menu } from "@mantine/core";
import { IconDots } from "@tabler/icons-react";
import { NavLink } from "react-router-dom";
import { EDIT_PROMOTION } from "../../../constants/AppUrls";

const promotions = (onEdit) => (info) => {
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
          to={EDIT_PROMOTION.replace(":id", original.id)}
        >
          Edit
        </Menu.Item>
        <Menu.Item
          onClick={() => onEdit(original.id, !original.isEnabled)}
          color={original.isEnabled ? "red" : "teal"}
        >
          {original.isEnabled ? "Disable" : "Enable"}
        </Menu.Item>
      </Menu.Dropdown>
    </Menu>
  );
};

export default promotions;
