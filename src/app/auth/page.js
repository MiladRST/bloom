"use client"
//import UpdateToken from "@/utils/UpdateToken";
import { useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import api from "@/services/apiService";

export default function Page() {    
    const router = useRouter()
    const params = useSearchParams()
    const redirect = params.get("redirect")
    console.log("page:auth => params: ", redirect);
    

    useEffect(() => {

        const updateAccessToken = async() => {
            try{
                const res = await fetch('/api/auth/refresh', { method: 'POST' })
                console.log(res);
                
                if(res.status === 401 ) {
                    router.replace('/login-register')
                }

                if(res.status === 200 ) {
                    redirect ? router.replace(redirect) : router.replace('/')
                }

            }catch(err) {
                console.log('auth:err =>', err);
                router.replace('/login-register')
            }
        }
        console.log('inside auth page')    

        updateAccessToken()
        
    }, []);

   return(
    <>
        <h1 style={{color: "#222"}}>Loading ...</h1>
    </>
   )
}

