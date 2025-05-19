'use server'

import { fromErrorToActionState, ActionState, ActionStateStatus, toActionState } from '@/components/form/utils/to-action-state';
import { z } from 'zod';
import { getAuthOrRedirect } from '@/features/auth/queries/get-auth-or-redirect';
import { verifyPasswordHash } from '../utils/hash-and-verify';
import { inngest } from '@/lib/inngest';


const passwordChangeSchema = z.object({
  password: z.string().min(6, "Password is too short").max(191),
});



export const passwordChange = async (_actionState: ActionState, formData: FormData) => {
    const auth = await getAuthOrRedirect()
    
    try{
        const { password } = passwordChangeSchema.parse({
            password: formData.get('password'),
        });


        const validPassword = await verifyPasswordHash(auth.user.passwordHash, password);

        if(!validPassword){
            return toActionState("Incorrect Password", ActionStateStatus.ERROR, formData);
        }
        

        await inngest.send({
            name: "app/password.password-reset",
            data: {
                userId: auth.user.id
            }
        })
        
    }catch(error){

        return fromErrorToActionState(error, formData);
    }


    return toActionState("Check Your Email For Password Link", ActionStateStatus.SUCCESS);
}