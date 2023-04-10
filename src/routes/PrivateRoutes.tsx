import React from "react";

import { IRoutes } from "../types/Types.Route";
import PortFolioPage from "../pages/PortfolioPage";
import EditPortfolio from "../pages/PortfolioPage/EditPage";
const NoutFound = React.lazy(() => import("../pages/NoutFound"));
const UslugiPage = React.lazy(() => import("../pages/UslugiPage"));
const UslugiEditPage = React.lazy(() => import("../pages/UslugiPage/EditPage"));
const NewsPage = React.lazy(() => import("../pages/NewsPage"));
const EditPageNews = React.lazy(() => import("../pages/NewsPage/EditPage"));

const PrivateRoute: IRoutes[] = [
  {
    path: "/news",
    component: <NewsPage />,
    key: "NewsPage",
  },
  {
    path: "/news/:id",
    component: <EditPageNews />,
    key: "EditPageNews",
  },
  {
    path: "/uslugi",
    component: <UslugiPage />,
    key: "UslugiPage",
  },
  {
    path: "/uslugi/:id",
    component: <UslugiEditPage />,
    key: "UslugiPage",
  },
  {
    path: "/portfolio",
    component: <PortFolioPage />,
    key: "PortFolioPage",
  },
  {
    path: "/portfolio/:id",
    component: <EditPortfolio />,
    key: "EditPortfolio",
  },
  {
    path: "*",
    component: <NoutFound />,
    key: "NoutFound",
  },
];

export default PrivateRoute;
