import SiginPage from "../pages/SiginPage";
import { IRoutes } from "../types/Types.Route";


const PublicRoute : IRoutes[] = [
    {
        path: "/",
        component: <SiginPage/>,
        key: "signpage"
    }
];

export default PublicRoute;
