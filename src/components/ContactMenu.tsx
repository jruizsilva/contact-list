import { Menu, Button, rem } from "@mantine/core";
import {
  IconTrash,
  IconMenu2,
  IconDownload,
  IconFileImport,
} from "@tabler/icons-react";
import * as XLSX from "xlsx";
import { Contact } from "../types/contact";
import { useAppStore } from "../store/useAppStore";

interface Props {}

export default function ContactMenu(_props: Props): JSX.Element {
  const setContacts = useAppStore((store) => store.setContacts);

  return (
    <>
      <Menu shadow="md" width={200}>
        <Menu.Target>
          <Button variant="transparent" color="gray">
            <IconMenu2 />
          </Button>
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

                    setContacts(sheetData as Contact[]);
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
          >
            Eliminar todos
          </Menu.Item>
        </Menu.Dropdown>
      </Menu>
    </>
  );
}
