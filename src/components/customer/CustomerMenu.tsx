import { Menu, ActionIcon, rem } from "@mantine/core";
import { notifications } from "@mantine/notifications";
import {
  IconMenu2,
  IconFileImport,
  IconDownload,
  IconTrash,
} from "@tabler/icons-react";
import { exportToExcel } from "../../helpers/exportToExcel";
import { useAppStore } from "../../store/useAppStore";
import * as XLSX from "xlsx";
import { Customer } from "../../types/customer";

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
                    const workbook = XLSX.read(data);
                    const sheetName = workbook.SheetNames[0];
                    const sheet = workbook.Sheets[sheetName];
                    const sheetData = XLSX.utils.sheet_to_json(sheet);

                    setCustomers(sheetData as Customer[]);
                  };
                  reader.readAsArrayBuffer(file);
                }
              });
              input.click();
            }}
          >
            Importar desde excel
          </Menu.Item>
          <Menu.Item
            leftSection={
              <IconDownload style={{ width: rem(14), height: rem(14) }} />
            }
            onClick={() => {
              exportToExcel(customers, "customer-list");
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
