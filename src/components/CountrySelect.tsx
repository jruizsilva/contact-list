import { Select } from "@mantine/core";
import { SelectProps } from "@mantine/core";

interface Props extends SelectProps {}

export default function CountrySelect({ ...rest }: Props): JSX.Element {
  return (
    <>
      <Select
        placeholder="Seleccione el país"
        allowDeselect={false}
        data={[
          {
            group: "América",
            items: [
              { label: "Estados Unidos/Canadá", value: "+1" },
              { label: "México", value: "+52" },
              { label: "Argentina", value: "+54" },
              { label: "Brasil", value: "+55" },
              { label: "Chile", value: "+56" },
              { label: "Colombia", value: "+57" },
              { label: "Perú", value: "+51" },
              { label: "Panamá", value: "+507" },
              {
                label: "República Dominicana",
                value: "+1-809, +1-829, +1-849",
              },
              { label: "Costa Rica", value: "+506" },
            ],
          },
          {
            group: "Europa",
            items: [
              { label: "España", value: "+34" },
              { label: "Italia", value: "+39" },
              { label: "Francia", value: "+33" },
              { label: "Alemania", value: "+49" },
              { label: "Reino Unido", value: "+44" },
              { label: "Países Bajos", value: "+31" },
              { label: "Polonia", value: "+48" },
              { label: "Rusia", value: "+7" },
              { label: "Bélgica", value: "+32" },
              { label: "Hungría", value: "+36" },
            ],
          },
        ]}
        {...rest}
      />
    </>
  );
}
