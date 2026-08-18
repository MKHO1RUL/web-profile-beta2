import { createClient, type Client } from "@libsql/client"

let clientInstance: Client | null = null

export function getTursoClient(): Client {
  if (!clientInstance) {
    const url = process.env.TURSO_DATABASE_URL
    const authToken = process.env.TURSO_AUTH_TOKEN

    if (!url) {
      throw new Error("TURSO_DATABASE_URL environment variable is missing.")
    }

    clientInstance = createClient({
      url,
      authToken: authToken || undefined,
    })
  }
  return clientInstance
}

// Proxy wrapper enables lazy initialization, avoiding top-level build-time crashes when env vars are missing
export const turso = new Proxy({} as Client, {
  get(_target, prop) {
    const instance = getTursoClient()
    const value = (instance as any)[prop]
    return typeof value === "function" ? value.bind(instance) : value
  },
})
