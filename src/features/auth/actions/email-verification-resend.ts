'use server'

import { fromErrorToActionState, ActionStateStatus, toActionState } from '@/components/form/utils/to-action-state';
import { getAuthOrRedirect } from "../queries/get-auth-or-redirect";
import { sendEmailVerification } from '../emails/send-email-verification';
import { generateEmailVerificationCode } from '../utils/generate-email-verification-code';


export const emailVerificationResend = async () => {
    const { user } = await getAuthOrRedirect({
      checkEmailVerified: false,
      checkOrganization: false,
      checkActiveOrganization: false,
    });
    try{

        const verificationCode = await generateEmailVerificationCode(
            user.id,
            user.email
        );

        const result = await sendEmailVerification(user.username, user.email, verificationCode);

        if(result.error){
           return toActionState("Failed To Send Verification Email", ActionStateStatus.ERROR)
        }

    }catch(error){
        return fromErrorToActionState(error);
    }

    return toActionState("Verification Email Has Been Sent", ActionStateStatus.SUCCESS);

}