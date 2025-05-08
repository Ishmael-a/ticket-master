import { CardCompact } from "@/components/card-compact";
import { SignUpForm } from "@/features/auth/components/sign-up-form";
import Link from "next/link";
import { signInPath } from "../paths";


const SignUpPage = () => {
  return (
    <div className="flex-1 flex flex-col items-center justify-center">
      <CardCompact
        title="Sign Up"
        description="Create an account to get started"
        className="w-full max-w-[420px] animate-fade-in-from-top"
        content={<SignUpForm/>}
        footer={
          <>            
            <Link className="text-sm text-muted-foreground" href={signInPath()}>
                Have an account? Sign In now
            </Link>
          </>
        }
      />
    </div>
  );
};

export default SignUpPage;
