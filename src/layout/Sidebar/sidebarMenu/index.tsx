import * as React from "react";
import {
  StockOutlined,
  TeamOutlined,
  BarChartOutlined,
  AreaChartOutlined,
  FundOutlined,
  CommentOutlined,
  FundViewOutlined,
  TableOutlined,
  AlignCenterOutlined,
  ExclamationCircleOutlined,
} from "@ant-design/icons";
import { MenuProps, Tooltip } from "antd";
import { MdDataExploration, MdDataThresholding } from "react-icons/md";

type MenuItem = Required<MenuProps>["items"][number];

function getItem(
  label: React.ReactNode,
  key?: React.Key | null,
  icon?: React.ReactNode,
  danger?: boolean | null,
  children?: MenuItem[],
  theme?: "light" | "dark"
): MenuItem {
  return {
    label,
    key,
    icon,
    danger,
    children,
    theme,
  } as MenuItem;
}
<Tooltip></Tooltip>;
export const items: MenuProps["items"] = [
  getItem("Главная страница", 1, <TeamOutlined />, null, [
    getItem("главная страница", "/", <AlignCenterOutlined />),
    getItem("слидер", "/slider", <FundViewOutlined />),
    getItem("меню", "/menus", <TableOutlined />),
  ]),
  getItem("о копмании", "/about", <StockOutlined />),
  getItem("Услуги", "/services", <MdDataThresholding />),
  getItem("Портфолио", "/portfolio", <MdDataExploration />),
  getItem("Нам доверяют", '/uslugi', <BarChartOutlined />),
  getItem("новости", '/news', <AreaChartOutlined />),
  getItem("отзывы", '/comments', <CommentOutlined />),
  getItem("контакты", '/contact', <FundOutlined />),
  getItem("Выйти", 'sigout', <ExclamationCircleOutlined />, true),
];
