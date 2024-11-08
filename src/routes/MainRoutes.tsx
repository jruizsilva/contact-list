import { Navigate, Route, Routes } from "react-router-dom";
import { MainLayout } from "../components/layouts/MainLayout";
import ContactListPage from "../pages/ContactListPage";
import CustomerListPage from "../pages/CustomerListPage";

interface Props {}

export default function MainRoutes(_props: Props): JSX.Element {
  return (
    <>
      <Routes>
        <Route element={<MainLayout />}>
          <Route path="/contactos" element={<ContactListPage />} />
          <Route path="/clientes" element={<CustomerListPage />} />
        </Route>
        <Route path="*" element={<Navigate to={"/contactos"} />} />
      </Routes>
    </>
  );
}
