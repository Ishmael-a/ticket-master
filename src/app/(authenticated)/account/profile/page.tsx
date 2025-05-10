import { Heading } from '@/components/heading';
import { AccountTabs } from '../_navigation/tabs';
import React from 'react'

const ProfilePage = () => {
  return (
    <div className="flex-1 flex flex-col gap-y-8">
      <Heading
        title={"Profile"}
        description={"All Your Profile Information"}
        tabs={
            <AccountTabs />
        }
      />
    </div>
  );
}

export default ProfilePage
