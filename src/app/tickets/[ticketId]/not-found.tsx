import { ticketsPath } from '@/app/paths';
import { NotFound as NotFoundPlaceholder} from '@/components/not-found';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import React from 'react'

const NotFound = () => {
  return (
    <NotFoundPlaceholder
      label={`Ticket Not Found`}
      button={
        <Button variant={"outline"} asChild>
          <Link href={ticketsPath()}>Go Back To Tickets</Link>
        </Button>
      }
    />
  );
}

export default NotFound
