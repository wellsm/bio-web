import { Button } from "@/components/ui/button";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { PaginationEllipsis } from "@/components/ui/pagination";
import { BioMode } from "./bio";
import { cn } from "@/lib/utils";
import { http } from "@/lib/api";
import React from "react";

export type LinkProps = {
  id: number,
  title: string;
  url: string;
  thumbnail: string;
  interaction?: boolean;
  mode?: BioMode;
  onShare: (link: string) => void
};

export function BioLink({
  id,
  title,
  url,
  thumbnail,
  interaction = false,
  onShare,
  mode = BioMode.Default,
}: LinkProps) {
  const interact = (e: React.MouseEvent<HTMLElement>, id: number) => {
    e.preventDefault();

    const container = e.target instanceof Element
      ? e.target.closest('.share-button')
      : null;

    if (container?.nodeName.toLowerCase() === 'button') {
      return onShare(url);
    }

    http.post('interaction', { id, type: 'link' })
      .then(() => window.open(url, '_blank'));
  };

  return (
    <a href={url} className="group" onClick={(e) => interaction && interact(e, id)}>
      <Card className="mb-3 sm:hover:scale-105 bg-gray-200 border-0">
        <CardContent className="p-1">
          <div className="flex items-center justify-between">
            <img
              src={thumbnail}
              alt=""
              className={cn(
                mode == BioMode.Mobile ? "w-10 h-10" : "w-12 h-12",
                "rounded-md"
              )}
            />
            <CardTitle
              className={cn(
                mode == BioMode.Mobile ? "text-xs" : "text-base lg:w-[80%]",
                "text-slate-700 font-medium text-center w-[70%]"
              )}
            >
              {title}
            </CardTitle>
            <Button
              variant="ghost"
              size="icon"
              className={cn(
                mode == BioMode.Mobile ? "opacity-1" : "sm:opacity-0 sm:group-hover:opacity-100",
                "rounded-full text-slate-800 hover:bg-gray-300 hover:text-slate-800 share-button"
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
