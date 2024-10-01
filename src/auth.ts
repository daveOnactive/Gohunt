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
            userName: "Super Admin",
            name: "super admin",
            password: "admin",
            email: "admin@gohuntfx.com",
          },
        ];
        const user = users.find(
          (user) =>
            user.userName === credentials?.username &&
            user.password === credentials?.password
        );
        return user
          ? { id: user.id, name: user.name, email: user.email }
          : null;
      },
    }),
  ],
  basePath: BASE_PATH,
  secret: 'kfjkfmrmrkwaknfkrnfrnfr'
};

export const { handlers, auth, signIn, signOut } = NextAuth(authOptions);