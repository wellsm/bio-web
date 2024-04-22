export interface ILink {
    id?: number
    title: string
    url: string
    short_url?: string
    thumbnail: string
    active?: boolean
    fixed: boolean
}
export interface ICollectionLink {
    id: number
    title: string
    url: string
    thumbnail: string
}