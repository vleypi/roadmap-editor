export interface IHeaderLink {
    href: string
    label: string
}



export interface IFooterLink {
    label: string
    href: string
}

export interface IFooterSection {
    title: string
    links: IFooterLink[]
}

export interface IFooterSocial {
    icon: string
    href: string
    label: string
}