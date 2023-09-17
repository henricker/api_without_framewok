export function parseCSVtoJSON(csvString: string) {
  const lines = csvString.split('\n').map((v) => v.replace('\r', ''))
  const headers = lines[0].split(',')
  const jsonData = []

  for (let i = 1; i < lines.length; i++) {
    const currentLine = lines[i].split(',')
    if (currentLine.length === headers.length) {
      const obj = {} as Record<string, any>
      for (let j = 0; j < headers.length; j++) {
        obj[headers[j]] = currentLine[j]
      }
      jsonData.push(obj)
    }
  }

  return jsonData
}
