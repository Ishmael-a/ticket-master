"use client";

import { SubmitButton } from "@/components/form/submit-button";
import { passwordChange } from "../actions/password-change";
import { useActionState } from "react";
import {
  ActionStateStatus,
  initialActionState,
} from "@/components/form/utils/to-action-state";
import { Form } from "@/components/form/form";
import { FieldError } from "@/components/form/field-error";
import PasswordInput from "@/features/auth/components/password-input";

const PasswordChangeForm = () => {
  const [actionState, action] = useActionState(
    passwordChange,
    initialActionState
  );

  return (
    <Form action={action} actionState={actionState}>
      <PasswordInput
        name={"password"}
        placeholder={"Current Password"}
        autoComplete="password"
        defaultValue={
          actionState.status === ActionStateStatus.ERROR
            ? (actionState.payload?.get("password") as string)
            : ""
        }
      />
      <FieldError actionState={actionState} name="password" />


      <SubmitButton label={"Send Email"} />
    </Form>
  );
};

export { PasswordChangeForm };
