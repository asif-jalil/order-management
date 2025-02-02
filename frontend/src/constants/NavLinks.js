import {
  IconBox,
  IconGift,
  IconLayoutDashboard,
  IconShoppingCart,
} from "@tabler/icons-react";
import * as urls from "./AppUrls";

const navLinks = [
  {
    url: urls.DASHBOARD,
    label: "Dashboard",
    Icon: IconLayoutDashboard,
  },
  {
    url: urls.VIEW_PRODUCTS,
    label: "Products",
    Icon: IconBox,
    children: [
      {
        url: urls.VIEW_PRODUCTS,
        label: "View products",
      },
      {
        url: urls.ADD_PRODUCT,
        label: "Add product",
      },
    ],
  },
  {
    url: urls.VIEW_PROMOTIONS,
    label: "Promotions",
    Icon: IconGift,
    children: [
      {
        url: urls.VIEW_PROMOTIONS,
        label: "View promotions",
      },
      {
        url: urls.ADD_PROMOTION,
        label: "Add promotion",
      },
    ],
  },
  {
    url: urls.VIEW_ORDERS,
    label: "Orders",
    Icon: IconShoppingCart,
    children: [
      {
        url: urls.VIEW_ORDERS,
        label: "View orders",
      },
      {
        url: urls.ADD_ORDER,
        label: "Add order",
      },
    ],
  },
];

export default navLinks;
