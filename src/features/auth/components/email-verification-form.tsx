'use client'

import { Input } from "@/components/ui/input"
import { SubmitButton } from "@/components/form/submit-button";
import { useActionState } from "react"
import { ActionStateStatus, initialActionState } from "@/components/form/utils/to-action-state";
import { Form } from "@/components/form/form";
import { FieldError } from "@/components/form/field-error";
import { emailVerification } from "../actions/email-verification";



const EmailVerificationForm = () => {
  const [actionState, action] = useActionState(emailVerification, initialActionState);

  return (
    <Form action={action} actionState={actionState}>
      <Input
        name={"code"}
        placeholder={"Code"}
        defaultValue={
          actionState.status === ActionStateStatus.ERROR
            ? (actionState.payload?.get("email") as string)
            : ""
        }
      />
      <FieldError actionState={actionState} name="code" />

      <SubmitButton label={"Verify Email"} />
    </Form>
  );
};


export { EmailVerificationForm };