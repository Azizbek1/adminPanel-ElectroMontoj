import MainPage from "../pages/MainPage";
import { IRoutes } from "../types/Types.Route";


const PublicRoute : IRoutes[] = [
    {
        path: "/",
        component: <MainPage/>,
        key: "mainpage"
    }
];

export default PublicRoute;
