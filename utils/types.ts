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
    underline?: boolean,
    gutterTop?: boolean,
}

interface AboutSectionContent {
    title: string,
    headShot: ContentfulMedia,
    aboutText: string,
}

export interface AboutContent {
    aboutSectionContent: AboutSectionContent,
    servicesSectionContent: ServicesSectionContent,
}

export interface ContentfulMedia {
    url: string,
    title: string,
    description: string,
}

export interface WorkBeforeAfter {
    projectName: String,
    beforeMedia: ContentfulMedia[],
    afterMedia: ContentfulMedia[],
}

export interface WorkContent {
    title: string,
    workBeforeAfter: WorkBeforeAfter[],
}

export interface WorkCarouselContent {
    isBefore: boolean,
    media: ContentfulMedia[],
}

export interface SeoContent {
    title: string,
    description: string,
}

export interface ContactContent {
    header: string,
    slug: string,
    seo: SeoContent,
}

export interface ServiceCardProps {
    name: string,
    subServices: string[],
    icon: string,
}

export interface ServicesSectionContent {
    header: string,
    services: ServiceCardProps[],
}

export interface DynamicIconProps {
    name: string,
}