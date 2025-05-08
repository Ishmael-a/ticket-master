'use client'

import { useFormStatus } from 'react-dom'
import { LucideLoaderCircle } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { cloneElement } from 'react'
import clsx from 'clsx';


interface SubmitButtonProps {
  label?: string;
  icon?: React.ReactElement<{ className?: string }>;
  variant?: 
    | "default"
    | "destructive"
    | "outline"
    | "secondary"
    | "ghost"
    | "link";
  size?:
    |"default"
    |"sm"
    |"lg"
    |"icon";
}

const SubmitButton = ({ label, icon, variant, size }: SubmitButtonProps) => {
    const { pending } = useFormStatus();

    return (
    <Button disabled={pending} type="submit" variant={variant} size={size}> 
        {pending && (
            <LucideLoaderCircle className={clsx(
                'h-4 w-4 animate-spin',
                {
                '': !!label,
                })
            }/>
        )}
        {label}
        {
            pending ? null : icon ? 
            <span className={clsx({
                '': !!label,
            })}>
                {cloneElement(icon, {
                    className: "w-4 h-4"
                })}
            </span> 
            : null
        } 
    </Button>
    )
}

export {SubmitButton}