import { IIcon } from "./icon";

export interface ISocialMediaColor {
    text: string;
    background: string;
}

export interface ISocialMedia {
    id: number;
    icon: IIcon;
    url: string;
    active: boolean;
    order: number;
    colors: ISocialMediaColor;
}