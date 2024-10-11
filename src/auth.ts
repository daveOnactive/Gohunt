import NextAuth, { User, NextAuthConfig } from 'next-auth';
import Credentials from 'next-auth/providers/credentials';

export const BASE_PATH = '/api/auth'

export const authOptions: NextAuthConfig = {
  providers: [
      Credentials({
      name: "Credentials",
      credentials: {
        username: { label: "Username", type: "text", placeholder: "Enter your user name" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials): Promise<User | null> {
        const users = [
          {
            id: "admin-1",
            userName: process.env.SUPER_ADMIN_USER_NAME,
            name: process.env.SUPER_ADMIN_USER_NAME,
            password: process.env.SUPER_ADMIN_PASSWORD,
          },
          {
            id: "admin-2",
            userName: process.env.ADMIN_USER_NAME,
            name: process.env.ADMIN_USER_NAME,
            password: process.env.ADMIN_PASSWORD,
          },
        ];
        const user = users.find(
          (user) =>
            user.userName === credentials?.username &&
            user.password === credentials?.password
        );
        return user
          ? { id: user.id, name: user.name }
          : null;
      },
    }),
  ],
  basePath: BASE_PATH,
  secret: process.env.SECRET
};

export const { handlers, auth, signIn, signOut } = NextAuth(authOptions);