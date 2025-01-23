import { Button, Menu } from "@mantine/core";
import { useDispatch, useSelector } from "react-redux";
import useApi from "../../hooks/useApi";
import { IconLogout, IconSelector } from "@tabler/icons-react";
import { notifications } from "@mantine/notifications";
import { authActions } from "../../store/reducers/authReducer";

const TopMenu = () => {
  const user = useSelector((state) => state.auth.user);
  const api = useApi();
  const dispatch = useDispatch();

  const handleLogout = () => {
    api
      .post("/auth/logout")
      .then((res) => res.data)
      .then((res) => {
        notifications.show({
          variant: "success",
          message: res.message,
        });
        dispatch(authActions.signout());
      });
  };

  return (
    <Menu width={200}>
      <Menu.Target>
        <Button variant="subtle" rightSection={<IconSelector size={14} />}>
          {user.name}
        </Button>
      </Menu.Target>

      <Menu.Dropdown>
        <Menu.Item
          onClick={handleLogout}
          color="red"
          leftSection={<IconLogout size={14} />}
        >
          Logout
        </Menu.Item>
      </Menu.Dropdown>
    </Menu>
  );
};

export default TopMenu;
