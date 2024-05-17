import NextAuth from "next-auth"
import GoogleProvider from "next-auth/providers/google";
import GithubProvider, {GitHubProfile} from "next-auth/providers/github";
import Credentials from "next-auth/providers/credentials";

export const { handlers: {GET, POST}, signIn, signOut, auth } = NextAuth({
    providers: [
        GithubProvider({
            profile(profile: GitHubProfile){
                console.log(profile)
                return{
                    ...profile,
                    role: profile.role ?? "user",
                    id: profile.id.toString(),
                }
            },
            clientId: process.env.GITHUB_ID!,
            clientSecret: process.env.GITHUB_SECRET!,
        }),
        GoogleProvider({
                clientId: process.env.GOOGLE_CLIENT_ID!,
                clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
                authorization: {
                    params: {
                        prompt: "consent",
                        access_type: "offline",
                        response_type: "code"
                    }
                }
            }
        ),
        Credentials({
                name: 'Credentials',
                credentials: {
                    email: { label: 'Email', type: 'text' },
                    password: { label: 'Password', type: 'password' },
                },
                authorize: async (credentials) => {
                    const response = await fetch('', {
                        method: 'POST',
                        headers: {'Content-Type': 'application/json'},
                        body: JSON.stringify(credentials),
                    });

                    const user = await response.json();

                    if (response.ok && user) {
                        return user;
                    } else {
                        return null;
                    }
                }
            }
        ),

    ],
    callbacks:{
        async signIn({ user, account, profile, email, credentials }) {
            return true
        },
        async redirect({ url, baseUrl }) {
            return baseUrl
        },
        session({ session, token, user }) {
            return session;
        },
        async jwt({ token, user, account, profile, isNewUser }) {
            if (account && profile && profile.id) {
                return {
                    ...token,
                    accessToken: account.access_token,
                    id: profile.id.toString()
                };
            }
            return token;
        }

    }
    // session: {strategy:'jwt'},
    // ...authConfig


})