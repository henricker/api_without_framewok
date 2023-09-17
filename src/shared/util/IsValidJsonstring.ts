export function IsValidJSONString(content: string): boolean {
  try {
    JSON.parse(content)
    return true
  } catch (e) {
    return false
  }
}
