import React from "react";

import { IRoutes } from "../types/Types.Route";
import ServicesPage from "../pages/UslugiPage";
import UslugiPage from "../pages/UslugiPage";
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

];

export default PrivateRoute;
