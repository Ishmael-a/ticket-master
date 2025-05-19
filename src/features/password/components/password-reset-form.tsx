"use client";

import { Input } from "@/components/ui/input";
import { SubmitButton } from "@/components/form/submit-button";
import { passwordReset } from "../actions/password-reset";
import { useActionState } from "react";
import {
  ActionStateStatus,
  initialActionState,
} from "@/components/form/utils/to-action-state";
import { Form } from "@/components/form/form";
import { FieldError } from "@/components/form/field-error";

interface PasswordResetProps{
    tokenId: string
}

const PasswordResetForm = ({ tokenId }: PasswordResetProps) => {
  const [actionState, action] = useActionState(
    passwordReset.bind(null, tokenId),
    initialActionState
  );

  return (
    <Form action={action} actionState={actionState}>
      <Input
        name={"password"}
        type={"password"}
        placeholder={"Password"}
        autoComplete="password"
        defaultValue={
          actionState.status === ActionStateStatus.ERROR
            ? (actionState.payload?.get("password") as string)
            : ""
        }
      />
      <FieldError actionState={actionState} name="password" />

      <Input
        name={"confirmPassword"}
        type={"password"}
        placeholder={"Confirm Password"}
        autoComplete="confirmPassword"
        defaultValue={
          actionState.status === ActionStateStatus.ERROR
            ? (actionState.payload?.get("confirmPassword") as string)
            : ""
        }
      />
      <FieldError actionState={actionState} name="confirmPassword" />

      <SubmitButton label={"Confirm Password"} />
    </Form>
  );
};

export { PasswordResetForm };
