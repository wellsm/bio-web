import { ICollection } from "./collection";
import { IIcon } from "./icon";
import { ISocialMediaColor } from "./social-media";

interface IBioSocialMedia {
    id: number
    icon: IIcon;
    url: string;
    colors: ISocialMediaColor;
}

interface IBioProfile {
    name: string;
    avatar: string;
}

export interface IBioLink {
    id: number
    title: string
    url: string
    thumbnail: string
}

export interface IBio {
    profile: IBioProfile
    links: IBioLink[]
    medias: IBioSocialMedia[],
    configs: Record<string, string>
}


export interface IBioCollection {
    profile: IBioProfile
    collection: ICollection,
    medias: IBioSocialMedia[],
    configs: Record<string, string>
}