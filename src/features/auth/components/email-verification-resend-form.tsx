'use client'

import { SubmitButton } from "@/components/form/submit-button";
import { useActionState } from "react"
import { initialActionState } from "@/components/form/utils/to-action-state";
import { Form } from "@/components/form/form";
import { emailVerificationResend } from "../actions/email-verification-resend";



const EmailVerificationResendForm = () => {
  const [actionState, action] = useActionState(emailVerificationResend, initialActionState);

  return (
    <Form action={action} actionState={actionState}>
      <SubmitButton label={"Resend Code"} variant="ghost"/>
    </Form>
  );
};


export { EmailVerificationResendForm };