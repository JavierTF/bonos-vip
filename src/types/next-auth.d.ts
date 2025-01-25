declare module "next-auth" {
  interface Session {
    user: UserAttributes;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id: string;
  }
}
