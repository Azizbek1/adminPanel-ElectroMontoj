import { Suspense } from "react";
import { Spinner } from "./components";
import { Route, Routes } from "react-router-dom";
import LayoutMain from "./layout";
import MainPage from "./pages/MainPage";
import { PublicRoute } from "./routes";
function App() {
  return (
    <Suspense fallback={<Spinner />}>
      <Routes>
        <Route element={<LayoutMain />}>
          <Route index element={<MainPage />} />
          {PublicRoute.map((route) => (
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
}

export default App;
