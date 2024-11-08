export function capitalizeWords(cadena: string) {
  return cadena
    .split(" ")
    .map((palabra) => {
      return palabra.charAt(0).toUpperCase() + palabra.slice(1).toLowerCase();
    })
    .join(" ");
}
