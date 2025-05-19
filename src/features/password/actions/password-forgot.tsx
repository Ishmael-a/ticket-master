'use server'

import { fromErrorToActionState, ActionState, ActionStateStatus, toActionState } from '@/components/form/utils/to-action-state';
import { prisma } from "@/lib/prisma";
import { z } from 'zod';
import { inngest } from '@/lib/inngest';

const passwordForgotSchema = z.object({
    email: z
        .string()
        .min(1, "Email is required")
        .max(191, "Email is too long")
        .email(),
})



export const passwordForgot = async (_actionState: ActionState, formData: FormData) => {
    try{
        const { email } = passwordForgotSchema.parse(Object.fromEntries(formData));

        const user = await prisma.user.findUnique({
            where: {
                email,
            },
        })

        if(!user){
            return toActionState("Incorrect Email", ActionStateStatus.ERROR, formData);
        }


        await inngest.send({
            name: "app/password.password-reset",
            data: {
                userId: user.id
            }
        })
        
    }catch(error){

        return fromErrorToActionState(error, formData);
    }


    return toActionState("Check Your Email For Password Link", ActionStateStatus.SUCCESS);
}