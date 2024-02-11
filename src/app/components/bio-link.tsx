import { Button } from "@/components/ui/button";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { PaginationEllipsis } from "@/components/ui/pagination";
import { BioMode } from "./bio";
import { cn } from "@/lib/utils";
import { http } from "@/lib/api";

export type LinkProps = {
  id: number,
  title: string;
  url: string;
  thumbnail: string;
  interaction?: boolean;
  mode?: BioMode;
};

export function BioLink({
  id,
  title,
  url,
  thumbnail,
  interaction = false,
  mode = BioMode.Default,
}: LinkProps) {
  const interact = (id: number) => {
    http.post('interaction', { id, type: 'link' });
  };  

  return (
    <a href={url} className="group" onClick={() => interaction && interact(id)}>
      <Card className="mb-3 hover:scale-105 bg-gray-200 border-0">
        <CardContent className="p-1">
          <div className="flex items-center justify-between">
            <img
              src={thumbnail}
              alt=""
              className={cn(
                mode == BioMode.Mobile ? "w-10 h-10" : "sm:w-12 sm:h-12",
                "w-10 h-10 rounded-md"
              )}
            />
            <CardTitle
              className={cn(
                mode == BioMode.Mobile ? "text-xs" : "sm:text-base",
                "text-slate-700 font-medium text-xs"
              )}
            >
              {title}
            </CardTitle>
            <Button
              variant="ghost"
              size="icon"
              className={cn(
                mode == BioMode.Mobile ? "opacity-1" : "sm:opacity-0 sm:group-hover:opacity-100",
                "rounded-full text-slate-800 hover:bg-gray-300 hover:text-slate-800"
              )}
            >
              <PaginationEllipsis className="h-4 w-4" />
            </Button>
          </div>
        </CardContent>
      </Card>
    </a>
  );
}
