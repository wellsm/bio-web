import { useEffect, useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { SocialIcon } from "@/app/components/social-icon";
import { BioLink } from "@/app/components/bio-link";
import { Search } from "lucide-react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Input } from "@/components/ui/input";
import { http } from "@/lib/api";
import { IBio } from "../interfaces/bio";
import { cn, src } from "@/lib/utils";
import { Loading } from "./loading";
import { useBioStore } from "../stores/bio";

export enum BioMode {
  Default = 'default',
  Mobile = 'mobile',
}

type BioProps = {
  interaction?: boolean
  mode?: BioMode
}

export function Bio({ interaction = false, mode = BioMode.Default }: BioProps) {
  const [bio, setBio] = useState<IBio | null>(null);
  const [search, setSearch] = useState<string | null>(null);
  const [bioChanges] = useBioStore(state => [state.bioChanges]);

  const links = search ? bio?.links.filter((link) =>
    link.title.toLowerCase().substring(0, search.length) == search.toLowerCase()
  ) : bio?.links;

  // TODO - Interaction receive ID From Controls Quantity Requests
  const interact = (id: number, type: string) => {
    interaction && http.post('interaction', { id, type });
  }; 

  useEffect(() => {
    http.get("bio").then(({ data }) => {
      setBio(data);

      bioChanges == 0 && interact(1, 'view');
    });
  }, [bioChanges]);

  function onTypeSearch({
    currentTarget,
  }: React.SyntheticEvent<HTMLInputElement>) {
    setSearch(currentTarget.value.toLowerCase());
  }

  if (bio === null) {
    return <Loading />;
  }

  return (
    <div className="flex justify-center py-10 min-h-screen bg-gray-50 px-3">
      <div className="flex flex-col items-center max-w-screen-sm w-full">
        <Avatar className={cn(mode == BioMode.Mobile ? "h-20 w-20" : "sm:h-24 sm:w-24", "h-20 w-20")}>
          <AvatarImage src={src(bio.profile.avatar)} />
          <AvatarFallback>EF</AvatarFallback>
        </Avatar>
        <h6 className={cn(mode == BioMode.Mobile ? "text-base font-semibold mt-3" : "md:mt-4 sm:text-xl sm:font-bold", "text-base font-semibold text-slate-950")}>
          {bio.profile.name}
        </h6>
        <div className={cn(mode == BioMode.Mobile ? "mt-2" : "md:mt-4 sm:gap-0", "mt-2 flex justify-center")}>
          {bio.medias.map((media, index) => (
            <SocialIcon key={index} url={media.url} onClick={() => interact(media.id, 'media')}>
              <FontAwesomeIcon
                icon={[media.icon.family, media.icon.icon]}
                className={cn(mode == BioMode.Mobile ? "h-6 w-6" : "sm:h-7 sm:w-7", "h-6 w-6")}
              />
            </SocialIcon>
          ))}
        </div>
        <div className={cn(mode == BioMode.Mobile ? "mt-3" : "md:mt-6", "mt-3 w-full")}>
          {bio.configs["enable-search"] === "1" && (
            <div className="relative mb-3">
              <Search className={cn(mode == BioMode.Mobile ? "top-3" : "md:top-3.5", "absolute left-2 top-3 h-4 w-4 text-muted-foreground")} />
              <Input
                type="search"
                placeholder="Search Links, Products"
                className={cn(mode == BioMode.Mobile ? "h-10" : "md:h-11", "pl-8 py-4 h-10 text-gray-900 focus-visible:ring-0 border-zinc-200 focus-visible:outline-none")}
                onKeyUp={onTypeSearch}
                onChange={onTypeSearch}
              />
            </div>
          )}

          {links?.map((link, index) => (
            <BioLink 
              id={link.id}
              interaction={interaction}
              mode={mode}
              key={index}
              thumbnail={src(link.thumbnail)}
              title={link.title}
              url={link.url}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
