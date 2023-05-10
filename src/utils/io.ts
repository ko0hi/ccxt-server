const fs = require('fs')

export const readJsonFile = (filePath: string): object => JSON.parse(fs.readFileSync(filePath, 'utf8'))
