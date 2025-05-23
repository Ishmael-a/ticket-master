import { Heading } from '@/components/heading';
import { AccountTabs } from '../_navigation/tabs';
import React from 'react'
import {PasswordChangeForm} from "@/features/password/components/password-change-form";
import { CardCompact } from "@/components/card-compact";


const PasswordPage = () => {
  return (
    <div className="flex-1 flex flex-col gap-y-8">
      <Heading
        title={"Password"}
        description={"Keep Your Account Secure"}
        tabs={<AccountTabs />}
      />
      <div className="flex-1 flex flex-col items-center ">
        <CardCompact
          title="Change Password"
          description="Enter your current password"
          className="w-full max-w-[420px] animate-fade-in-from-top"
          content={<PasswordChangeForm />}
        />
      </div>
    </div>
  );
}

export default PasswordPage
