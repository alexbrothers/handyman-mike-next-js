import { createClient, ContentfulClientApi } from 'contentful';
import { AboutContent, ContactContent, HeaderContent, HomeContent, ReviewCardContent, ReviewContentfulContent, WorkContent } from '../utils/types';

class ContentfulClient {
    private client: ContentfulClientApi;

    constructor() {
        this.client = this.initializeContentful();
    }

    private initializeContentful(): ContentfulClientApi {
        const environment: string = process.env.ENVIRONMENT || "development";
        const spaceId: string | undefined = process.env.CONTENTFUL_SPACE_ID;
        if (spaceId == null || spaceId == undefined) {
            throw new Error("Environment variable CONTENTFUL_SPACE_ID is required");
        }
        let accessToken: string | undefined;
        if (environment === "development") {
            accessToken = process.env.CONTENTFUL_PREVIEW_ACCESS_TOKEN;
        }
        else {
            accessToken = process.env.CONTENTFUL_DELIVERY_ACCESS_TOKEN;
        }
        if (accessToken == null || accessToken == undefined) {
            throw new Error("Environment variable CONTENTFUL_DELIVERY_ACCESS_TOKEN is required");
        }
        const environmentId: string | undefined = process.env.CONTENTFUL_ENVIRONMENT_ID;
        if (environmentId == null || environmentId == undefined) {
            throw new Error("Environment variable CONTENTFUL_ENVIRONMENT_ID is required");
        }
        return createClient(
            {
                accessToken: accessToken,
                space: spaceId,
                host: environment === "development" ? "preview.contentful.com" : undefined,
            },
        );
    }

    async getHomeContent(): Promise<HomeContent> {
        const homeContentResponse = await this.client.getEntries({
            content_type: "home",
            limit: 1,
        });
        const homeContent: any = homeContentResponse.items[0].fields;
        return {
            headline: homeContent.headline,
            subHeadline: homeContent.subHeadline,
            heroText: homeContent.heroText,
            callToActionButtonText: homeContent.callToActionButtonText,
            subCallToActionButtonText: homeContent.subCallToActionButtonText,
            seo: {
                title: homeContent.seo.fields.title,
                description: homeContent.seo.fields.description,
            }
        }
    }

    async getAboutContent(): Promise<AboutContent> {
        const aboutContentResponse = await this.client.getEntries({
            content_type: "about",
            limit: 1,
        });
        const servicesContentResponse = await this.client.getEntries({
            content_type: "servicesSection",
            limit: 1,
        })
        const aboutContent: any = aboutContentResponse.items[0].fields;
        const servicesContent: any = servicesContentResponse.items[0].fields;
        return {
            aboutSectionContent: {
                title: aboutContent.aboutSection.fields.title,
                headShot: {
                    title: aboutContent.aboutSection.fields.headShot.fields.title,
                    description: aboutContent.aboutSection.fields.headShot.fields.description,
                    url: aboutContent.aboutSection.fields.headShot.fields.file.url,
                },
                aboutText: aboutContent.aboutSection.fields.aboutText,
            },
            servicesSectionContent: {
                header: servicesContent.header,
                services: servicesContent.services.map(function(service: any) {
                    return {
                        name: service.fields.name,
                        subServices: service.fields.subServices,
                        icon: service.fields.icon,
                    }
                })
            },
            seo: {
                title: aboutContent.seo.fields.title,
                description: aboutContent.seo.fields.description,
            }
        }
    }

    async getWorkContent(): Promise<WorkContent> {
        const workContentResponse = await this.client.getEntries({
            content_type: "work",
            limit: 1,
        });
        const workContent: any = workContentResponse.items[0].fields;
        return {
            title: workContent.title,
            workBeforeAfter: workContent.workBeforeAfter.map(function(item: any) {
                return {
                    projectName: item.fields.projectName,
                    beforeMedia: item.fields.beforeMedia.map(function(beforeMediaItem: any) {
                        return {
                            url: beforeMediaItem.fields.file.url,
                            title: beforeMediaItem.fields.title,
                            description: beforeMediaItem.fields.description,
                        }
                    }),
                    afterMedia: item.fields.afterMedia.map(function(afterMediaItem: any) {
                        return {
                            url: afterMediaItem.fields.file.url,
                            title: afterMediaItem.fields.title,
                            description: afterMediaItem.fields.description,
                        }
                    })
                }
            }),
            seo: {
                title: workContent.seo.fields.title,
                description: workContent.seo.fields.description,
            }
        }
    }

    async getContactContent(): Promise<ContactContent> {
        const contactContentResponse = await this.client.getEntries({
            content_type: "contact",
            limit: 1,
        });
        const contactContent: any = contactContentResponse.items[0].fields;
        return {
            header: contactContent.header,
            slug: contactContent.slug,
            seo: {
                title: contactContent.seo.fields.title,
                description: contactContent.seo.fields.description,
            }
        }
    }

    getFakeReviewData(): ReviewCardContent[] {
        return [
            {
                firstName: "Alex",
                stars: 5,
                review: "Mike has done several jobs for me, and for all jobs he was extremely professional, on time, and provided excellent work. The fan installation he did for me was quick and easy (for him) and he also helped but together a bedframe for me. I am 100% calling Mike for my next project."
            },
            {
                firstName: "Krystal",
                stars: 5,
                review: "Mike was great! Very responsive and timely. He mounted a TV for me and hung numerous decorative wall items, including a very large mirror. All done with care and all done properly.  I will have many other needs in the future and I will certainly call Mike. Highly recommend!"
            }
        ]
    }

    async getReviewsContent(): Promise<ReviewContentfulContent> {
        const reviewsContentResponse = await this.client.getEntries({
            content_type: "reviews",
            limit: 1,
        });
        const reviewsContent: any = reviewsContentResponse.items[0].fields;
        return {
            header: reviewsContent.header,
            slug: reviewsContent.slug,
            leaveReviewCallToAction: reviewsContent.leaveReviewCallToAction,
            seo: {
                title: reviewsContent.seo.fields.title,
                description: reviewsContent.seo.fields.description,
            }
        }
    }
}

export class ContentfulClientFactory {
    private static client: ContentfulClient | undefined;

    private constructor() {

    }

    static getInstance(): ContentfulClient {
        if (ContentfulClientFactory.client == undefined) {
            ContentfulClientFactory.client = new ContentfulClient();
        }
        return ContentfulClientFactory.client;
    }
}