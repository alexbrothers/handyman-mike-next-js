export interface HomeContent {
    headline: string,
    subHeadline: string,
    heroText: string,
    callToActionButtonText: string,
    subCallToActionButtonText: string,
}

export interface HeaderLink {
    displayText: string,
    relativePath: string,
    isButton?: boolean,
}

export interface HeaderContent {
    logo: string,
    logoText: string,
    headerLinks: HeaderLink[],
}

type Component = "h1" | "h2" | "h3" | "h4"

export interface SectionHeaderProps {
    name: string,
    component: Component,
    gutterBottom?: boolean,
}

interface AboutSectionContent {
    title: string,
    headShot: ContentfulMedia,
    aboutText: string,
}

export interface AboutContent {
    aboutSectionContent: AboutSectionContent
}

interface ContentfulMedia {
    url: string,
    title: string,
    description: string,
}