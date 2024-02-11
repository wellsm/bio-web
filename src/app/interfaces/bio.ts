import { IIcon } from "./icon";

interface IBioSocialMedia {
    id: number
    icon: IIcon;
    url: string;
}

interface IBioProfile {
    name: string;
    avatar: string;
}

interface IBioLink {
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