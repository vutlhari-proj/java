export function capitalizeWords(str) {
  return str
    .toLowerCase()
    .split(" ")
    .filter(word => word.trim() !== "")
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}