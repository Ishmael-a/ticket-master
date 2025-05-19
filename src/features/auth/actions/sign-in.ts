'use server'

import { homePath } from '@/app/paths';
import { fromErrorToActionState, ActionState, ActionStateStatus, toActionState } from '@/components/form/utils/to-action-state';
import { redirect } from 'next/navigation';
import { prisma } from "@/lib/prisma";
import { createSession } from '@/lib/lucia';
import { z } from 'zod';
import { verifyPasswordHash } from '@/features/password/utils/hash-and-verify';
import { generateSessionToken } from '@/utils/crypto';
import { setSessionCookie } from '../utils/session-cookie';

const signupSchema = z.object({
    email: z
        .string()
        .min(1, "Email is required")
        .max(191, "Email is too long")
        .email(),
    password: z.string().min(6,"Password is too short").max(191),
})



export const signIn = async (_actionState: ActionState, formData: FormData) => {
    try{
        const { email, password } = signupSchema.parse(Object.fromEntries(formData));

        const user = await prisma.user.findUnique({
            where: {
                email,
            },
        })

        if(!user){
            return toActionState("Incorrect Email or Password", ActionStateStatus.ERROR, formData);
        }

        const validPassword = await verifyPasswordHash(
          user.passwordHash,
          password
        );

        if(!validPassword){
            return toActionState("Incorrect Email or Password", ActionStateStatus.ERROR, formData);
        }


        // const session = await lucia.createSession(user.id, {});
        // const sessionCookie = lucia.createSessionCookie(session.id);
        const sessionToken = generateSessionToken();
        const session = await createSession(sessionToken, user.id);

        // const cookieStore = await cookies();

        // cookieStore.set(
        //     sessionCookie.name,
        //     sessionCookie.value,
        //     sessionCookie.attributes,
        // )

        await setSessionCookie(sessionToken, session.expiresAt);
    
    }catch(error){

        return fromErrorToActionState(error, formData);
    }


    redirect(homePath());
}