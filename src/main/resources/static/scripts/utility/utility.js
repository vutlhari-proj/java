export function capitalizeWords(str) {
  const exceptions = ["of", "to", "and"];
  const romanWithSuffixRegex = /^(M{0,4}(CM|CD|D?C{0,3})(XC|XL|L?X{0,3})(IX|IV|V?I{0,3}))[A-Z]?$/i;

  return str
    .toLowerCase()
    .split(/([\s-]+)/) // split but keep spaces & hyphens
    .map((word, index, arr) => {
      if (/^[\s-]+$/.test(word)) return word; // delimiters stay as is

      const prev = arr[index - 1] || "";
      const isFirstWord = index === 0;
      const prevEndsWithNumber = /\d$/.test(prev);
      const isRomanOrSuffix = romanWithSuffixRegex.test(word);

      if (
        isFirstWord ||                 // first word always capitalized
        prevEndsWithNumber ||          // capitalize after numbers
        isRomanOrSuffix ||             // roman numeral (with optional suffix like IVA)
        !exceptions.includes(word)     // not in exceptions
      ) {
        // roman numerals and suffixes should be full uppercase
        return isRomanOrSuffix ? word.toUpperCase() 
                               : word.charAt(0).toUpperCase() + word.slice(1);
      }

      return word;
    })
    .join("");
}

export async function getPermissions() {
  const response = await fetch("/static/config/permissions.json");
  return await response.json();
}

export function getUserRole() {
  return localStorage.getItem("role");
}