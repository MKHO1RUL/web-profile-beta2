import { createClient } from "@libsql/client"

const url = process.env.TURSO_DATABASE_URL
const authToken = process.env.TURSO_AUTH_TOKEN

if (!url) {
  console.warn("TURSO_DATABASE_URL is not set in environment variables.")
}

export const turso = createClient({
  url: url || "",
  authToken: authToken || undefined,
})
