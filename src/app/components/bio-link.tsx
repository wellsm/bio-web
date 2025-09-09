import { Button } from "@/components/ui/button";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { PaginationEllipsis } from "@/components/ui/pagination";
import { BioLayout, BioMode } from "./bio";
import { cn } from "@/lib/utils";
import { http } from "@/lib/api";
import React from "react";

export type LinkProps = {
  id: number;
  title: string;
  url: string;
  thumbnail: string;
  interaction?: boolean;
  mode?: BioMode;
  layout?: BioLayout | undefined;
  onShare: (link: string) => void;
};

export function BioLink({
  id,
  title,
  url,
  thumbnail,
  interaction = false,
  onShare,
  mode = BioMode.Default,
  layout = BioLayout.List,
}: LinkProps) {
  const interact = (e: React.MouseEvent<HTMLElement>, id: number) => {
    e.preventDefault();

    const container =
      e.target instanceof Element ? e.target.closest(".share-button") : null;

    if (container?.nodeName.toLowerCase() === "button") {
      return onShare(url);
    }

    http
      .post("interaction", { id, type: "link" })
      .then(() => window.open(url, "_blank"));
  };

  function getThumbnail(thumbnail: string) {
    const baseURL = import.meta.env.VITE_API_MEDIA_BASE_URL;  

    return thumbnail.includes(baseURL)
      ? thumbnail.replace(baseURL, "").replace(/^\/|\/$/g, "")
      : thumbnail;
  }

  return layout == BioLayout.List ? (
    <a
      href={url}
      className="group flex flex-wrap w-full"
      onClick={(e) => interaction && interact(e, id)}
    >
      <Card className="mb-3 sm:hover:scale-105 bg-gray-200 border-0 w-full">
        <CardContent className="p-1">
          <div
            className={cn(
              layout == BioLayout.List
                ? "flex items-center justify-between"
                : ""
            )}
          >
            <img
              src={getThumbnail(thumbnail)}
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
                mode == BioMode.Mobile
                  ? "opacity-1"
                  : "sm:opacity-0 sm:group-hover:opacity-100",
                "rounded-full text-slate-800 hover:bg-gray-300 hover:text-slate-800 share-button"
              )}
            >
              <PaginationEllipsis className="h-4 w-4" />
            </Button>
          </div>
        </CardContent>
      </Card>
    </a>
  ) : (
    <a
      href={url}
      className="flex flex-wrap"
      onClick={(e) => interaction && interact(e, id)}
    >
      <Card className="bg-gray-200 border border-slate-300 rounded-md">
        <CardContent className="p-0 rounded-t-xs">
          <img src={thumbnail} className="rounded-t-md" />
          <CardTitle
            className={cn("w-[90%] mx-auto mt-1 mb-1 text-slate-700 font-medium text-center",
              mode == BioMode.Default ? "text-xs md:text-sm" : "text-xs"
            )}
          >
            {title}
          </CardTitle>
        </CardContent>
      </Card>
    </a>
  );
}
