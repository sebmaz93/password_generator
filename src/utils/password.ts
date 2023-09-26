import { PasswordConfig } from "src/types/password.ts";

export const generatePassword = ({
  lowerCase,
  upperCase,
  symbols,
  numbers,
  maxLength,
}: PasswordConfig) => {
  const charsetLowercase = "abcdefghijklmnopqrstuvwxyz";
  const charsetUppercase = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const charsetNumbers = "0123456789";
  const charsetSymbols = "!@#$%^&*()_+[]{}|;:,.<>?";

  let allChars = "";
  if (lowerCase) allChars += charsetLowercase;
  if (upperCase) allChars += charsetUppercase;
  if (numbers) allChars += charsetNumbers;
  if (symbols) allChars += charsetSymbols;

  let generatedPassword = "";
  for (let i = 0; i < maxLength; i++) {
    const randomIndex = Math.floor(Math.random() * allChars.length);
    generatedPassword += allChars[randomIndex];
  }

  return generatedPassword;
};
