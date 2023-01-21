export default function formatCamelCase(word) {
  let formattedWord = word.replace(/([A-Z])/g, " $1").trim();
  formattedWord =
    formattedWord.charAt(0).toUpperCase() + formattedWord.slice(1);
  return formattedWord;
}
