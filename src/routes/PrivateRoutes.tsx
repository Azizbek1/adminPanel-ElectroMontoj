import React from "react";

import { IRoutes } from "../types/Types.Route";
const PortFolioPage = React.lazy(() => import("../pages/PortfolioPage"));
const EditPortfolio = React.lazy(() => import("../pages/PortfolioPage/EditPage"));
const AboutPage = React.lazy(() => import("../pages/AboutPage"));
const EditAboutPage = React.lazy(() => import("../pages/AboutPage/EditPage"));
const SliderPage = React.lazy(() => import("../pages/SliderPage"));
const EditPageSlide = React.lazy(() => import("../pages/SliderPage/EditPage"));
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
    path: "/about",
    component: <AboutPage />,
    key: "AboutPage",
  },
  {
    path: "/about/:id",
    component: <EditAboutPage />,
    key: "EditAboutPage",
  },
  {
    path: "/slider",
    component: <SliderPage />,
    key: "SliderPage",
  },
  {
    path: "/slider/:id",
    component: <EditPageSlide />,
    key: "EditPageSlide",
  },
  {
    path: "*",
    component: <NoutFound />,
    key: "NoutFound",
  },
];

export default PrivateRoute;
