import { Suspense } from "react";
import { Spinner } from "./components";
import { Route, Routes } from "react-router-dom";
import LayoutMain from "./layout";
import MainPage from "./pages/MainPage";
import { PrivateRoute, PublicRoute } from "./routes";
import useAppSelector from "./hooks/useAppSelector";
function App() {
  const { status, authAdmin } = useAppSelector(({ user }) => user);
  if (status && authAdmin === "admin") {
    return (
      <Suspense fallback={<Spinner />}>
        <Routes>
          <Route element={<LayoutMain />}>
            <Route index element={<MainPage />} />
            {PrivateRoute.map((route) => (
              <Route
                element={route.component}
                path={route.path}
                key={route.key}
              />
            ))}
          </Route>
        </Routes>
      </Suspense>
    );
  } else {
    return(
      <Suspense fallback={<Spinner />}>
      <Routes>
        {PublicRoute.map((route) => (
          <Route element={route.component} path={route.path} key={route.key} />
        ))}
      </Routes>
    </Suspense>  
    )
  }
}

export default App;
