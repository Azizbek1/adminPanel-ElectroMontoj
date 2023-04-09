import { ColumnsType } from "antd/es/table";
import { IMenuPropsColumns } from "./Columns/columns.props";

export interface ITableCustun {
    loading?: boolean,
    data: IMenuPropsColumns[],
    columns: ColumnsType<IMenuPropsColumns>,
    key?: string | number
}
 