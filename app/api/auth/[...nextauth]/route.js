import NextAuth from "next-auth"
import GoogleProvider from "next-auth/providers/google"
import User from "@models/user";

import { connectToDb } from "@utils/database";  // the name inside the {} should be the same as the name of the function in the file

const handler=NextAuth({
    providers:[
        GoogleProvider({
            clientId:process.env.GOOGLE_ID,
            clientSecret:process.env.GOOGLE_CLIENT_SECRET
        })
    ],

        callbacks:{
            async session({session}){ //session is an object that contains the user's session data
                const sessionUser=await User.findOne({email:session.user.email});
                session.user.id=sessionUser.id.toString();
                return session; // to know which user is currently logged in
                
            },
            async signIn({profile}){
                try{
                    await connectToDb();
                    //check if a user already exists
                    const userExists=await User.findOne({email:profile.email});
        
                    // if not create a new user
                    if (!userExists){
                        await User.create({
                            email: profile.email,
                            username: profile.name.replace(" ","").toLowerCase(), //remove spaces and convert to lowercase
                            image: profile.picture
        
                        })
                    }
        
                    return true;
        
                }
                catch(err){
                    console.log("failed to sign in",err);
                    return false;
                }
            }
        }
    
    
})
export {handler as GET, handler as POST} 