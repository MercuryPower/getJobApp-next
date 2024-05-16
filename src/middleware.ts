import { auth } from "@/auth"

export default auth((req) => {
    if (!req.auth) {
        // const url = req.url.replace(req.nextUrl.pathname, "/login")
        const isLoggedIn = !!req.auth;
        console.log("ROUTE: ", req.nextUrl.pathname)
        console.log("IS LOGGEDIN: ", isLoggedIn)
        // return Response.redirect(url)
    }
})
export const config = {
    matcher:['/((?!.*\\..*|_next).*)', '/', '/(api|trpc)(.*)'],
}