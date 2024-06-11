
import { auth } from "@/auth"
import {useAuth} from "@/providers";
import {redirect} from "next/navigation";
import {NextResponse} from "next/server";

export default auth((req) => {
    // const authorizationHeader = req.headers.get('Authorization');
    // const { user } = useAuth();
    // if(authorizationHeader && req.url === 'http://localhost:3000/vacancies/create'){
    //     return NextResponse.redirect(new URL('/', req.url))
    // }
    // return NextResponse.next();
    // const { isLoggedIn } = useAuth();
    // if (!req.auth) {
    //     const url = req.url.replace(req.nextUrl.pathname, "/login")
    //     const isLoggedIn = req.auth;
    //     console.log("ROUTE: ", req.nextUrl.pathname)
    //     console.log("IS LOGGEDIN: ", isLoggedIn)
    //     // return Response.redirect(url)
    // }
})
export const config = {
    matcher:['/((?!.*\\..*|_next).*)', '/', '/(api|trpc)(.*)'],
}