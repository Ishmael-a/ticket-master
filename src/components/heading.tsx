import React from 'react'
import { Separator } from "@/components/ui/separator";

interface HeadingProps{
    title: string;
    description?: string;
}

const Heading: React.FC<HeadingProps> = ({title, description}) => {
  return (
    <>
        <section>
            <h2 className="text-3xl font-bold tracking-tight">{title}</h2>
            <p className="text-sm text-muted-foreground">
            {description}
            </p>
        </section>

        <Separator />
    </>
  )
}

export {Heading}
