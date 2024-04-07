import { ICollectionLink } from "./link"

export interface ICollection {
    id: number
    hash: string
    name: string
    description: string
    links: ICollectionLink[]
}