import { Skeleton } from '@/components/ui/skeleton'
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const Loading = () => {
  return (
    <div className=" flex justify-center">
      <div className={"w-full flex gap-x-1 max-w-[500px]"}>
        <Card className="w-full">
          <CardHeader>
            <CardTitle className="flex gap-x-2 items-center">
              <Skeleton className={"w-10 h-10 rounded-full"} />
              <Skeleton className="h-6 w-3/4" />
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-5/6" />
              <Skeleton className="h-4 w-4/5" />
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

export default Loading;
