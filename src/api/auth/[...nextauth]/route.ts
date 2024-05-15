import NextAuth from "next-auth"
import GithubProvider, {GithubProfile} from "next-auth/providers/github"
import GoogleProvider from "next-auth/providers/google";
export const authOptions = {
    providers: [
        GithubProvider({
            profile(profile: GithubProfile){
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
        })
    ],

}

export default NextAuth(authOptions)