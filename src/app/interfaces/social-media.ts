import { IIcon } from "./icon";

export interface ISocialMedia {
    id: number;
    icon: IIcon;
    url: string;
    active: boolean;
    order: number;
}