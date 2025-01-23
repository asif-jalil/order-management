import SignIn from "../pages/Auth/SignIn";
import Dashboard from "../pages/Dashboard/Dashboard";
import AddProduct from "../pages/Products/AddProduct";
import EditProduct from "../pages/Products/EditProduct";
import ViewProducts from "../pages/Products/ViewProducts";
import AddPromotion from "../pages/Promotions/AddPromotion";
import EditPromotion from "../pages/Promotions/EditPromotion";
import ViewPromotions from "../pages/Promotions/ViewPromotions";
import * as urls from "./AppUrls";

const route = [
  //UNPROTECTED ROUTES
  {
    path: urls.SIGNIN,
    Element: SignIn,
    isIndexUrl: true,
    isProtected: false,
  },
  //PROTECTED ROUTES
  {
    path: urls.DASHBOARD,
    Element: Dashboard,
    isIndexUrl: false,
    isProtected: true,
  },
  {
    path: urls.VIEW_PRODUCTS,
    Element: ViewProducts,
    isIndexUrl: false,
    isProtected: true,
  },
  {
    path: urls.ADD_PRODUCT,
    Element: AddProduct,
    isIndexUrl: false,
    isProtected: true,
  },
  {
    path: urls.EDIT_PRODUCT,
    Element: EditProduct,
    isIndexUrl: false,
    isProtected: true,
  },
  {
    path: urls.VIEW_PROMOTIONS,
    Element: ViewPromotions,
    isIndexUrl: false,
    isProtected: true,
  },
  {
    path: urls.ADD_PROMOTION,
    Element: AddPromotion,
    isIndexUrl: false,
    isProtected: true,
  },

  {
    path: urls.EDIT_PROMOTION,
    Element: EditPromotion,
    isIndexUrl: false,
    isProtected: true,
  },
];

export default route;
