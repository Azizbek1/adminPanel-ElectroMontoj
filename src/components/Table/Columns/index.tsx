import { ColumnsType } from "antd/lib/table/interface";
import { IMenuPropsColumns } from "./columns.props";
import { Button } from "antd";
import { MdCancel, MdOutlineModeEditOutline } from "react-icons/md";
import { Link } from "react-router-dom";
import ColomunsStyled from "./Style";
import { MenuUrlRoute } from "../../../utils";
export const Userscolumns: ColumnsType<IMenuPropsColumns> = [
  {
    title: "Имя",
    key: "name",
    dataIndex: "name",
  },
  {
    title: "URL адрес",
    key: "url",
    dataIndex: "url",
  },
  {
    title: "Иконка",
    key: "icon",
    dataIndex: "icon",
  },
  {
    title: "Действия",
    key: "id",
    dataIndex: "id",
    render: (id) => {
      return (
        <>
          <ColomunsStyled>
            <Link className="warning__edit" to={`${MenuUrlRoute}/${id}`}>
              <MdOutlineModeEditOutline />
            </Link>
            <Button type="primary" danger>
              <MdCancel />
            </Button>
          </ColomunsStyled>
        </>
      );
    },
  },
];
