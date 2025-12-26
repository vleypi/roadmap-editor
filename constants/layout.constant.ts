import { IFooterLink, IFooterSection, IFooterSocial, IHeaderLink } from "@/types/layout.interface";

export const HEADER_LINKS: IHeaderLink[] = [
    // { 
    //     href: '/', 
    //     label: 'Home', 
    // },
    // { 
    //     href: '/examples', 
    //     label: 'Examples', 
    // },
    // { 
    //     href: '/docs', 
    //     label: 'Docs', 
    // }
] as const;


export const FOOTER_PRODUCT_LINKS: IFooterLink[] = [
    { label: 'Features', href: '#' },
    { label: 'Examples', href: '/examples' },
]

const FOOTER_RESOURCES_LINKS: IFooterLink[] = [
    { label: 'Documentation', href: '/docs' },
]

const FOOTER_COMPANY_LINKS: IFooterLink[] = [
    { label: 'About', href: '#' },
    { label: 'Blog', href: '#' },
    { label: 'Careers', href: '#' },
    { label: 'Contact', href: '#' }
]

export const FOOTER_SOCIAL_LINKS: IFooterSocial[]= [
    { icon: 'fab fa-github', href: 'https://github.com/vleypi', label: "Visit my GitHub"},
]

export const FOOTER_SECTIONS: IFooterSection[]  = [
    { title: 'Product', links: FOOTER_PRODUCT_LINKS },
]
