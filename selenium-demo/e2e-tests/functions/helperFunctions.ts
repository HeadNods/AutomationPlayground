/**
 * Description: Takes a string and escapes special characters that should not be interpreted by regex
 * @param {string} text - The input string to escape
 * @returns {string} - The escaped string
 */
export function escapeRegExp(text: string) {
  return text.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"); // $& means the whole matched string
}
