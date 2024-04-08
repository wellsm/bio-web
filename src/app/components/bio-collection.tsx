import { useEffect, useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { IconStyle, SocialIcon } from "@/app/components/social-icon";
import { BioLink } from "@/app/components/bio-link";
import { Share } from "@/app/components/share";
import { Loading } from "@/app/components/loading";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { http } from "@/lib/api";
import { IBioCollection } from "@/app/interfaces/bio";
import { cn, fallback, src } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { PaginationEllipsis } from "@/components/ui/pagination";
import { Helmet } from "react-helmet";

export enum BioLayout {
  List = "list",
  Grid = "grid",
}

type BioCollectionProps = {
  hash: string;
  interaction?: boolean;
};

export function BioCollection({
  interaction = false,
  hash,
}: BioCollectionProps) {
  const [bio, setBio] = useState<IBioCollection|null>(null);
  const [shareText, setShareText] = useState<string|null>(null);

  const layout: BioLayout = (bio?.configs?.layout ??
    BioLayout.List) as BioLayout;

  // TODO - Interaction receive ID From Controls Quantity Requests
  const interact = (id: number, type: string) => {
    interaction && http.post("interaction", { id, type });
  };

  useEffect(() => {
    if (hash === '') {
      return;
    }

    http.get(`bio/collections/${hash}`).then(({ data }) => {
      setBio(data);
      //interact(1, "view");
    });
  }, [hash]);

  if (bio === null) {
    return <Loading />;
  }

  return (
    <div className="flex justify-center py-8 min-h-screen bg-gray-50 px-3">
      <Helmet>
        <title>{bio.profile.name} - Bio</title>

        <meta name="theme-color" content="#FFFFFF"/>
      </Helmet>
      <div className="flex flex-col items-center max-w-screen-sm w-full relative">
        <Button
          variant="ghost"
          size="icon"
          className="opacity-1 absolute right-0 sm:-right-12 -top-4 rounded-full text-slate-900 font-semibold bg-gray-200 border border-gray-300 hover:bg-gray-300 hover:text-slate-900 hover:border-gray-400"
          onClick={() => setShareText(window.location.href)}
        >
          <PaginationEllipsis className="h-4 w-4" />
        </Button>
        {shareText !== null && (
          <Share
            link={shareText}
            isOpen={true}
            onClose={() => setShareText(null)}
          />
        )}
        <Avatar
          className="sm:h-24 sm:w-24 h-20 w-20"
        >
          {bio.profile.avatar && <AvatarImage src={src(bio.profile.avatar)} />}
          <AvatarFallback>{fallback(bio.profile.name)}</AvatarFallback>
        </Avatar>
        <h6
          className="text-xl font-bold mt-3 text-slate-950"
        >
          {bio.profile.name}
        </h6>
        <div
          className="gap-3 mt-2 flex justify-center"
        >
          {bio.medias.map((media, index) => (
            <SocialIcon
              key={index}
              url={media.url}
              onClick={() => interact(media.id, "media")}
              iconStyle={bio.configs['icon-style'] as IconStyle}
              style={{
                background: media.colors.background,
                color: media.colors.text
              }}
            >
              <FontAwesomeIcon
                icon={[media.icon.family, media.icon.icon]}
                className="h-7 w-7"
              />
            </SocialIcon>
          ))}
        </div>
        <div className="mt-3 w-full">
        <div
            className={cn(
              "grid",
              bio.configs.layout == BioLayout.Grid ? "grid-cols-3 gap-2 md:grid-cols-3 lg:grid-cols-4" : "grid-cols-1"
            )}
          >
            {bio.collection.links?.map((link, index) => (
              <BioLink
                id={link.id}
                interaction={interaction}
                key={index}
                thumbnail={src(link.thumbnail)}
                title={link.title}
                url={link.url}
                onShare={(link) => setShareText(link)}
                layout={layout}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
