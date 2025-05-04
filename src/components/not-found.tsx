import { LucideMessageSquareWarning } from 'lucide-react'
import React,{ cloneElement } from 'react'

interface NotFoundPageProps{
    label: string;
    icon?: React.ReactElement;
    button?: React.ReactNode;
}

const NotFound:React.FC<NotFoundPageProps> = ({label, icon = <LucideMessageSquareWarning/>, button = null}) => {
  return (
    <div className="flex-1 flex flex-col items-center justify-center space-y-4">
      <div className=" flex flex-row items-center gap-4">
        {cloneElement(icon, {
          className: `w-10 h-10 ${icon.props.className || ""}`,
        })}
        <h2 className="text-lg items-center">{label}</h2>
      </div>
      <div className="mt-4 h-10">{button}</div>
    </div>
  );
}

export {NotFound}
