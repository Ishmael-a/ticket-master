"use client";

import { Input } from "@/components/ui/input";
import { SubmitButton } from "@/components/form/submit-button";
import { passwordForgot } from "../actions/password-forgot";
import { useActionState } from "react";
import {
  ActionStateStatus,
  initialActionState,
} from "@/components/form/utils/to-action-state";
import { Form } from "@/components/form/form";
import { FieldError } from "@/components/form/field-error";

const PasswordForgotForm = () => {
  const [actionState, action] = useActionState(
    passwordForgot,
    initialActionState
  );

  return (
    <Form action={action} actionState={actionState}>
      <Input
        name={"email"}
        placeholder={"Email"}
        autoComplete="email"
        defaultValue={
          actionState.status === ActionStateStatus.ERROR
            ? (actionState.payload?.get("email") as string)
            : ""
        }
      />
      <FieldError actionState={actionState} name="email" />


      <SubmitButton label={"Send Email"} />
    </Form>
  );
};

export { PasswordForgotForm };
