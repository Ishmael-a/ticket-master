import { CardCompact } from "@/components/card-compact";
import { SignInForm } from "@/features/auth/components/sign-in-form";
import { signUpPath, forgotPasswordPath } from "../paths";
import Link from "next/link";

const SignInPage = () => {


  return (
    <div className="flex-1 flex flex-col items-center justify-center">
      <CardCompact
        title="Sign In"
        description="Sign In To Your Account"
        className="w-full max-w-[420px] animate-fade-in-from-top"
        content={<SignInForm />}
        footer={
          <>
            <Link className="text-sm text-muted-foreground" href={signUpPath()}>
              No account yet?
            </Link>

            <Link
              className="text-sm text-muted-foreground"
              href={forgotPasswordPath()}
            >
              Forgot Password?
            </Link>
          </>
        }
      />
    </div>
  );
};

export default SignInPage;
