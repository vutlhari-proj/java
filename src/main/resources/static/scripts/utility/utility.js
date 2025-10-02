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

// 1. Validate South African ID number: 13 digits, only numbers, no spaces
export function validateIdNumber(idNum) {
    const trimmed = idNum.replace(/\s+/g, '');
    const isNumeric = /^\d{13}$/.test(trimmed);
    return isNumeric;
}

// 2. Validate cellphone: 10 digits, only numbers, no spaces
export function validateCellphone(cellphone) {
    const trimmed = cellphone.replace(/\s+/g, '');
    const isNumeric = /^\d{10}$/.test(trimmed);
    return isNumeric;
}

// 3. Validate email address structure
export function validateEmail(email) {
    // Basic email regex
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email.trim());
}

export function validateLettersOnly(str) {
    // Remove spaces and check for strictly letters (A-Z, a-z)
    const trimmed = str.replace(/\s+/g, '');
    return /^[A-Za-z]+$/.test(trimmed);
}

export function validatePassword(password, confirmPassword) {
  const errors = [];
  const minLength = 8;
  if (password.length < minLength) {
    errors.push('Password must be at least 8 characters.');
  }
  if (!/[A-Z]/.test(password)) {
    errors.push('Password must contain at least one uppercase letter.');
  }
  if (!/[^A-Za-z0-9]/.test(password)) {
    errors.push('Password must contain at least one special character.');
  }
  if (password !== confirmPassword) {
    errors.push('Passwords do not match.');
  }
  return errors.length > 0 ? errors : null;
}

export async function getRoles() {
  const response = await fetch("/config/permissions.json");
  if (!response.ok) throw new Error("Failed to fetch roles: " + response.status);
  return await response.json();
}