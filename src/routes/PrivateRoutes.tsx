import MainPage from "../pages/MainPage";
import { IRoutes } from "../types/Types.Route";


const PrivateRoute : IRoutes[] = [
    {
        path: "/",
        component: <MainPage/>,
        key: "mainpage"
    }
];

export default PrivateRoute;
