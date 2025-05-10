import { Heading } from '@/components/heading';
import { AccountTabs } from '../_navigation/tabs';
import React from 'react'

const PasswordPage = () => {
  return (
    <div className="flex-1 flex flex-col gap-y-8">
      <Heading
        title={"Password"}
        description={"Keep Your Account Secure"}
        tabs={<AccountTabs />}
      />
    </div>
  );
}

export default PasswordPage
