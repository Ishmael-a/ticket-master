'use server'

import { ticketsPath } from "@/app/paths";
import { fromErrorToActionState, ActionState, ActionStateStatus, toActionState } from '@/components/form/utils/to-action-state';
import { redirect } from 'next/navigation';
import { prisma } from "@/lib/prisma";
import { createSession } from '@/lib/lucia';
import { z } from 'zod';
import { generateSessionToken } from '@/utils/crypto';
import { setSessionCookie } from '../utils/session-cookie';
import { getAuthOrRedirect } from "../queries/get-auth-or-redirect";
import { setToastMessage } from "@/actions/toast";
import { validateEmailVerificationCode } from "../utils/validate-email-verification-code";

const emailVerificationSchema = z.object({
    code: z
        .string()
        .length(8),
})



export const emailVerification = async (_actionState: ActionState, formData: FormData) => {
    const { user } = await getAuthOrRedirect({
        checkEmailVerified: false
    });
    try{

        const { code } = emailVerificationSchema.parse(
          Object.fromEntries(formData)
        );

        const validCode = await validateEmailVerificationCode(user.id, user.email, code);

        if(!validCode){
            return toActionState("Invalid Or Expired Code", ActionStateStatus.ERROR)
        }


        await prisma.session.deleteMany({
            where: {
                userId: user.id
            }
        })

        await prisma.user.update({
            where: {
                id: user.id
            },
            data:  {
                emailVerified: true
            }
        })

        const sessionToken = generateSessionToken();
        const session = await createSession(sessionToken, user.id);


        await setSessionCookie(sessionToken, session.expiresAt);
    }catch(error){
        return fromErrorToActionState(error, formData);
    }

    await setToastMessage("Email Verified🎉👏")
    redirect(ticketsPath());
}