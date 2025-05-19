'use server'

import { fromErrorToActionState, ActionState, toActionState, ActionStateStatus } from '@/components/form/utils/to-action-state';
import { z } from 'zod';
import { signInPath } from '@/app/paths';
import { redirect } from 'next/navigation';
import { setToastMessage } from '@/actions/toast';
import { hashToken } from '@/utils/crypto';
import { hash } from "@node-rs/argon2";
import { prisma } from '@/lib/prisma';


const passwordResetSchema = z
  .object({
    password: z.string().min(6, "Password is too short").max(191),
    confirmPassword: z.string().min(6, "Password is too short").max(191),
  })
  .superRefine(({ password, confirmPassword }, ctx) => {
    if (password !== confirmPassword) {
      ctx.addIssue({
        code: "custom",
        message: "Passwords do not match",
        path: ["confirmPassword"],
      });
    }
  });



export const passwordReset = async (tokenId: string, _actionState: ActionState, formData: FormData) => {
    try{
        const { password } = passwordResetSchema.parse({
          password: formData.get('password'),
          confirmPassword: formData.get('confirmPassword'),
        });

        const tokenHash = hashToken(tokenId);

        const passwordResetToken = await prisma.passwordResetToken.findUnique({
            where: {
                tokenHash
            }
        })

        if(!passwordResetToken || Date.now() > passwordResetToken.expiresAt.getTime()){
            return toActionState("Expired Or Invalid Verification Token", ActionStateStatus.ERROR, formData)
        }

        if(passwordResetToken){
            await prisma.passwordResetToken.delete({
              where: {
                tokenHash,
              },
            });
        }

        await prisma.session.deleteMany({
          where: {
            userId: passwordResetToken.userId,
          },
        });

        const passwordHash = await hash(password); 

        await prisma.user.update({
            where: {
                id: passwordResetToken.userId
            },
            data: {
                passwordHash: passwordHash
            }
        })
    
    }catch(error){

        return fromErrorToActionState(error, formData);
    }

    await setToastMessage("Successfully Reset Password");
    redirect(signInPath())
}