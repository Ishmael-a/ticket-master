import React from 'react'
import { Separator } from "@/components/ui/separator";

interface HeadingProps{
    title: string;
    description?: string;
    tabs?: React.ReactNode;
    actions?: React.ReactNode;
}

const Heading: React.FC<HeadingProps> = ({title, description, tabs, actions}) => {
  return (
    <>
        {tabs}
        <div className='flex items-center justify-between px-8'>
          <section>
              <h2 className="text-3xl font-bold tracking-tight">{title}</h2>
              <p className="text-sm text-muted-foreground">
              {description}
              </p>
          </section>
          <div className="flex gap-x-2">
          {actions}
          </div>
        </div>

        <Separator />
    </>
  )
}

export {Heading}
