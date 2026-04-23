import NextAuth from 'next-auth';
import Credentials from 'next-auth/providers/credentials';

export const { handlers, signIn, signOut, auth } = NextAuth({
    providers: [
        Credentials({
            name: 'credentials',
            credentials: {
                email: { label: 'Email', type: 'email' },
                password: { label: 'Password', type: 'password' },
            },
            async authorize(credentials) {
                const email = process.env.ADMIN_EMAIL;
                const password = process.env.ADMIN_PASSWORD;

                if (credentials?.email === email && credentials?.password === password) {
                    return {
                        id: '1',
                        email: email,
                        name: 'Serhii Demidov',
                    };
                }
                return null;
            },
        }),
    ],
    pages: {
        signIn: '/admin/login',
    },
    session: {
        strategy: 'jwt',
    },
    callbacks: {
        authorized({ auth, request: { nextUrl } }) {
            const isLoggedIn = !!auth?.user;
            const isAdminPage = nextUrl.pathname.startsWith('/admin');
            const isLoginPage = nextUrl.pathname === '/admin/login';

            if (isAdminPage && !isLoginPage && !isLoggedIn) {
                return Response.redirect(new URL('/admin/login', nextUrl));
            }
            return true;
        },
    },
});
