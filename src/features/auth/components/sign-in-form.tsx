'use client'

import { Input } from "@/components/ui/input"
import { SubmitButton } from "@/components/form/submit-button";
import { signIn } from "../actions/sign-in"
import { useActionState } from "react"
import { ActionStateStatus, initialActionState } from "@/components/form/utils/to-action-state";
import { Form } from "@/components/form/form";
import { FieldError } from "@/components/form/field-error";
import PasswordInput from "./password-input";



const SignInForm = ()  => {
    const [ actionState, action ] = useActionState(
        signIn,
        initialActionState
    )


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

        <PasswordInput
          name={"password"}
          placeholder={"Password"}
          defaultValue={
            actionState.status === ActionStateStatus.ERROR
              ? (actionState.payload?.get("password") as string)
              : ""
          }
        />
        <FieldError actionState={actionState} name="password" />

        <SubmitButton label={"Sign In"} />
      </Form>
    );
}


export { SignInForm }