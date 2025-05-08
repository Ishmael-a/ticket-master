'use server'

import { fromErrorToActionState, ActionState, ActionStateStatus, toActionState } from '@/components/form/utils/to-action-state';
import { lucia } from '@/lib/lucia';
import { prisma } from "@/lib/prisma";
import { cookies } from "next/headers";
import { hash } from "@node-rs/argon2";
import { z } from 'zod';
import { redirect } from 'next/navigation';
import { homePath } from '@/app/paths';
import { Prisma } from 'generated/prisma';

const signupSchema = z.object({
    username: z
        .string()
        .min(1, "Username is required")
        .max(191, "Username is too long")
        .refine((value) => !value.includes(" "),"Username cannot contain spaces"),
    email: z
        .string()
        .min(1, "Email is required")
        .max(191, "Email is too long")
        .email(),
    password: z.string().min(6,"Password is too short").max(191),
    confirmPassword: z.string().min(6,"Password is too short").max(191),
})
.superRefine(({ password, confirmPassword }, ctx)  => {
    if(password !== confirmPassword){
        ctx.addIssue({
            code: "custom",
            message: "Passwords do not match",
            path: ["confirmPassword"]
        })
    }
})


export const signUp = async (_actionState: ActionState, formData: FormData) => {
    try{
        const { username, email, password } = signupSchema.parse(Object.fromEntries(formData))

        const hashedPassword = await hash(password);

        const newUser = await prisma.user.create({
            data: {
                username,
                email,
                passwordHash: hashedPassword
            },
        })

        const session = await lucia.createSession(newUser.id, {});
        const sessionCookie = lucia.createSessionCookie(session.id);

        const cookieStore = await cookies();

        cookieStore.set(
            sessionCookie.name,
            sessionCookie.value,
            sessionCookie.attributes,
        )
    
    }catch(error){
        if(error instanceof Prisma.PrismaClientKnownRequestError && error.code === "P2002"){
            return toActionState(
              "Either email or username already in use",
              ActionStateStatus.SUCCESS,
              formData
            );
        }
        return fromErrorToActionState(error, formData);
    }

    redirect(homePath());
}