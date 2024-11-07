import { Navigate, Route, Routes } from "react-router-dom";
import { MainLayout } from "../components/layouts/MainLayout";
import HomePage from "../pages/HomePage";

interface Props {}

export default function MainRoutes(_props: Props): JSX.Element {
  return (
    <>
      <Routes>
        <Route element={<MainLayout />}>
          <Route path="/" element={<HomePage />} />
        </Route>
        <Route path="*" element={<Navigate to={"/"} />} />
      </Routes>
    </>
  );
}
