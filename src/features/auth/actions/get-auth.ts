'use server'

import { cookies } from 'next/headers';
import { cache } from 'react';
import { SESSION_COOKIE_NAME } from "../utils/session-cookie";
import { validateSession } from '@/lib/lucia';

export const getAuth = cache(async () => {
    const cookieStore = await cookies();
    
    const sessionToken = cookieStore.get(SESSION_COOKIE_NAME)?.value ?? null;

    if (!sessionToken) {
      return {
        user: null,
        session: null,
      };
    }

    // const result = await lucia.validateSession(sessionId);

    // try{
    //     if(result.session && result.session.fresh){
    //         const sessionCookie = lucia.createSessionCookie(result.session.id);
    //         cookieStore.set(
    //             sessionCookie.name,
    //             sessionCookie.value,
    //             sessionCookie.attributes
    //         );
    //     }

    //     if(!result.session){
    //         const sessionCookie = lucia.createBlankSessionCookie();
    //         cookieStore.set(
    //             sessionCookie.name,
    //             sessionCookie.value,
    //             sessionCookie.attributes
    //         );
    //     }

    // }catch{
    //     //do nothing in an rsc
    // }
    // return result

    return await validateSession(sessionToken);
})

