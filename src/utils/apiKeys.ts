import { readJsonFile } from './io'

require('dotenv').config({ path: './.env' })

const API_KEY_JSON_PATH = process.env.CCXT_SERVER_APIS || null
const API_KEYS = API_KEY_JSON_PATH !== null ? readJsonFile(API_KEY_JSON_PATH) : null

export const hasApiKeys = () => API_KEYS !== null

export const getApiKeys = () => {
  if (API_KEYS === null) {
    throw new Error('No API keys')
  }
  return API_KEYS
}
