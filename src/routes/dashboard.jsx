import Home from "views/Home/Home";
import Skut from "views/Skut/Skut";
import Category from "views/Category/Category";
import SkutModel from "views/SkutModel/SkutModel";
import Stand from "views/Stand/Stand";
import Icons from "views/Icons/Icons";
import Maps from "views/Maps/Maps";
import Notifications from "views/Notifications/Notifications";

const dashboardRoutes = [
  
  {
    path: "/home",
    name: "Home",
    icon: "pe-7s-home",
    component: Home
  },
  {
    path: "/skut",
    name: "Skut",
    icon: "pe-7s-gym",
    component: Skut
  },
  {
    path: "/category",
    name: "Skut Category",
    icon: "pe-7s-settings",
    component: Category
  },
  {
    path: "/model",
    name: "Skut Model",
    icon: "pe-7s-helm",
    component: SkutModel
  },
  {
    path: "/stand",
    name: "Stands",
    icon: "pe-7s-way",
    component: Stand
  },
  { path: "/icons", name: "Icons", icon: "pe-7s-science", component: Icons },
  {
    path: "/notifications",
    name: "Notifications",
    icon: "pe-7s-bell",
    component: Notifications
  },
  { redirect: true, path: "/", to: "/home", name: Home, component: Home }
];

export default dashboardRoutes;
