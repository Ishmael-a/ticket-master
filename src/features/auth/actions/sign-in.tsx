'use server'

import { homePath } from '@/app/paths';
import { fromErrorToActionState, ActionState, ActionStateStatus, toActionState } from '@/components/form/utils/to-action-state';
import { redirect } from 'next/navigation';
import { prisma } from "@/lib/prisma";
import { lucia } from '@/lib/lucia';
import { cookies } from "next/headers";
import { verify } from "@node-rs/argon2";
import { z } from 'zod';

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

        const validPassword = await verify(user.passwordHash, password)

        if(!validPassword){
            return toActionState("Incorrect Email or Password", ActionStateStatus.ERROR, formData);
        }

        const session = await lucia.createSession(user.id, {});
        const sessionCookie = lucia.createSessionCookie(session.id);

        const cookieStore = await cookies();

        cookieStore.set(
            sessionCookie.name,
            sessionCookie.value,
            sessionCookie.attributes,
        )

    
    }catch(error){

        return fromErrorToActionState(error, formData);
    }


    redirect(homePath());
}