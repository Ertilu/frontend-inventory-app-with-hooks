/*!

=========================================================
* Paper Dashboard React - v1.1.0
=========================================================

* Product Page: https://www.creative-tim.com/product/paper-dashboard-react
* Copyright 2019 Creative Tim (https://www.creative-tim.com)

* Licensed under MIT (https://github.com/creativetimofficial/paper-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import Dashboard from "views/Dashboard.jsx";
import Category from "views/Category.jsx";
import AddProduct from "views/addProduct.jsx";
import AddCategory from "views/addCategory.jsx";
import AppVersion from "views/Version.jsx";
// import UpgradeToPro from "views/Upgrade.jsx";

var routes = [
  {
    path: "/dashboard",
    name: "Product",
    icon: "nc-icon nc-bank",
    component: Dashboard,
    layout: "/admin"
  },
  {
    path: "/addProduct",
    name: "Add Product",
    icon: "nc-icon nc-simple-add",
    component: AddProduct,
    layout: "/admin"
  },
  {
    path: "/category",
    name: "Category",
    icon: "nc-icon nc-box",
    component: Category,
    layout: "/admin"
  },
  {
    path: "/addCategory",
    name: "Add Category",
    icon: "nc-icon nc-simple-add",
    component: AddCategory,
    layout: "/admin"
  },
  {
    path: "/info",
    name: "App version",
    icon: "nc-icon nc-alert-circle-i",
    component: AppVersion,
    layout: "/admin"
  }
  // {
  //   path: "/icons",
  //   name: "Icons",
  //   icon: "nc-icon nc-diamond",
  //   component: Icons,
  //   layout: "/admin"
  // }
  // {
  //   path: "/maps",
  //   name: "Maps",
  //   icon: "nc-icon nc-pin-3",
  //   component: Maps,
  //   layout: "/admin"
  // },
  // {
  //   path: "/notifications",
  //   name: "Notifications",
  //   icon: "nc-icon nc-bell-55",
  //   component: Notifications,
  //   layout: "/admin"
  // }
  // {
  //   path: "/tables",
  //   name: "Table List",
  //   icon: "nc-icon nc-tile-56",
  //   component: TableList,
  //   layout: "/admin"
  // },
  // {
  //   path: "/typography",
  //   name: "Typography",
  //   icon: "nc-icon nc-caps-small",
  //   component: Typography,
  //   layout: "/admin"
  // }
];
export default routes;
