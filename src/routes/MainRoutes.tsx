import { Navigate, Route, Routes } from "react-router-dom";
import { MainLayout } from "../components/layouts/MainLayout";
import ContactListPage from "../pages/ContactPage";
import CustomerPage from "../pages/CustomerPage";

interface Props {}

export default function MainRoutes(_props: Props): JSX.Element {
  return (
    <>
      <Routes>
        <Route element={<MainLayout />}>
          <Route path="/contactos" element={<ContactListPage />} />
          <Route path="/clientes" element={<CustomerPage />} />
        </Route>
        <Route path="*" element={<Navigate to={"/contactos"} />} />
      </Routes>
    </>
  );
}
