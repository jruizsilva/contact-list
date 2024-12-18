import { Menu, rem, ActionIcon } from "@mantine/core";
import {
  IconTrash,
  IconMenu2,
  IconDownload,
  IconFileImport,
} from "@tabler/icons-react";
import * as XLSX from "xlsx";
import { Contact } from "../../types/contact";
import { useAppStore } from "../../store/useAppStore";
import { notifications } from "@mantine/notifications";
import { exportContactsToExcel } from "../../helpers/exportContactsToExcel";

interface Props {}

export default function ContactMenu(_props: Props): JSX.Element {
  const contacts = useAppStore((store) => store.contacts);
  const setContacts = useAppStore((store) => store.setContacts);

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
                    const sheetData: Contact[] =
                      XLSX.utils.sheet_to_json(sheet);

                    setContacts(sheetData);
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
              exportContactsToExcel(contacts, "contact-list");
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
              if (confirm("¿Estás seguro de eliminar todos los contactos?")) {
                setContacts([]);
                notifications.show({
                  title: "Contactos eliminados",
                  message: "Se han eliminado todos los contactos",
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
