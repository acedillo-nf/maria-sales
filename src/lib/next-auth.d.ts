import NextAuth from "next-auth"

declare module "next-auth" {
  interface User {
    id: string
    // other properties...
  }

  interface Session {
    user: {
      id: string
      // other properties...
    } & DefaultSession["user"]
  }
}