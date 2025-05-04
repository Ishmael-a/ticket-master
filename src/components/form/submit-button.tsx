
import { useFormStatus } from 'react-dom'
import { LucideLoaderCircle } from 'lucide-react'
import { Button } from '@/components/ui/button'


interface SubmitButtonProps{
    label: string
}

const SubmitButton = ({ label }: SubmitButtonProps) => {
    const { pending } = useFormStatus();

    return (
    <Button disabled={pending} type="submit"> 
        {pending && (
            <LucideLoaderCircle className="mr-2 h-4 w-4 animate-spin"/>
        )}
        {label} 
    </Button>
    )
}

export {SubmitButton}