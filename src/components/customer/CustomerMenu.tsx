import { Menu, ActionIcon, rem } from "@mantine/core";
import { notifications } from "@mantine/notifications";
import {
  IconMenu2,
  IconFileImport,
  IconDownload,
  IconTrash,
} from "@tabler/icons-react";
import { useAppStore } from "../../store/useAppStore";
import * as XLSX from "xlsx";
import { Customer, CustomerString } from "../../types/customer";
import { exportCustomersToExcel } from "../../helpers/exportCustomersToExcel";

interface Props {}

export default function CustomerMenu(_props: Props): JSX.Element {
  const customers = useAppStore((store) => store.customers);
  const setCustomers = useAppStore((store) => store.setCustomers);

  return (
    <>
      <Menu shadow="md" width={200}>
        <Menu.Target>
          <ActionIcon variant="subtle" size="lg" radius="xl" color="gray">
            <IconMenu2 style={{ width: "70%", height: "70%" }} stroke={1.5} />
          </ActionIcon>
        </Menu.Target>

        <Menu.Dropdown>
          <Menu.Label>Application</Menu.Label>
          <Menu.Item
            leftSection={
              <IconFileImport style={{ width: rem(14), height: rem(14) }} />
            }
            onClick={() => {
              const input = document.createElement("input");
              input.type = "file";
              input.accept = ".xlsx";
              input.addEventListener("change", (event) => {
                const file = (event.target as HTMLInputElement).files?.[0];
                if (file) {
                  const reader = new FileReader();
                  reader.onload = (event) => {
                    const data = event.target?.result;
                    if (data) {
                      const workbook = XLSX.read(data, { type: "array" });
                      const sheetName = workbook.SheetNames[0];
                      const sheet = workbook.Sheets[sheetName];
                      const sheetData: CustomerString[] =
                        XLSX.utils.sheet_to_json(sheet);

                      // Mapea los datos al tipo Customer
                      const formattedData: Customer[] = sheetData.map(
                        (item) => ({
                          id: item["id"] as string,
                          name: item["name"] as string,
                          last_follow_up: item["last_follow_up"]
                            ? new Date(item["last_follow_up"])
                            : null,
                          purchased_products:
                            (item["purchased_products"] as string)
                              ?.split(",")
                              .map((prod) => prod.trim()) || [],
                          interests:
                            (item["interests"] as string)
                              ?.split(",")
                              .map((interest) => interest.trim()) || [],
                          phone: item["phone"] as string,
                          country_code: item["country_code"] as string,
                          birthday: item["birthday"]
                            ? new Date(item["birthday"])
                            : null,
                          created_at: new Date(item["created_at"]),
                        })
                      );

                      setCustomers(formattedData);
                    }
                  };
                  reader.readAsArrayBuffer(file);
                }
              });
              input.click();
            }}
          >
            Importar desde Excel
          </Menu.Item>

          <Menu.Item
            leftSection={
              <IconDownload style={{ width: rem(14), height: rem(14) }} />
            }
            onClick={() => {
              exportCustomersToExcel(customers, "customer-list");
            }}
          >
            Exportar a excel
          </Menu.Item>

          <Menu.Divider />

          <Menu.Label>Danger zone</Menu.Label>
          <Menu.Item
            color="red"
            leftSection={
              <IconTrash style={{ width: rem(14), height: rem(14) }} />
            }
            onClick={() => {
              if (confirm("¿Estás seguro de eliminar a todos los clientes?")) {
                setCustomers([]);
                notifications.show({
                  title: "Clientes eliminados",
                  message: "Se han eliminado todos los clientes",
                });
              }
            }}
          >
            Eliminar todos
          </Menu.Item>
        </Menu.Dropdown>
      </Menu>
    </>
  );
}
