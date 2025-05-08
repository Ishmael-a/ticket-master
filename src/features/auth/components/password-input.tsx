'use client'

import { Input } from '@/components/ui/input';
import clsx from 'clsx';
import { LucideEye, LucideEyeClosed } from 'lucide-react';
import React, { useState } from 'react'

const PasswordInput = ({
  name,
  placeholder,
  defaultValue,
  autoComplete
}: {
  name: string;
  placeholder: string;
  defaultValue?: string;
  autoComplete?: string;
}) => {
  const [passwordVisible, setPasswordVisible] = useState(false);

  return (
    <div className="relative">
      <Input
        name={name}
        placeholder={placeholder}
        type={passwordVisible ? "text" : "password"}
        defaultValue={defaultValue}
        autoComplete={autoComplete}
      />
      <div
        className=""
        onClick={() =>
          setPasswordVisible((prevPasswordVisible) => !prevPasswordVisible)
        }
      >
        <LucideEyeClosed
          className={clsx(
            "w-4 h-4 absolute top-2.5 right-3 text-muted-foreground duration-300 ease-in-out",
            {
              "scale-0": passwordVisible,
              "scale-100": !passwordVisible,
            }
          )}
        />
        <LucideEye
          className={clsx(
            "w-4 h-4 absolute top-2.5 right-3 text-muted-foreground duration-300 ease-in-out",
            {
              "scale-0": !passwordVisible,
              "scale-100": passwordVisible,
            }
          )}
        />
      </div>
    </div>
  );
};

export default PasswordInput
