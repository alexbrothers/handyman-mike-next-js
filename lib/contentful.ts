import { createClient, ContentfulClientApi } from 'contentful';
import { AboutContent, HeaderContent, HomeContent } from '../utils/types';

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
        }
    }

    async getAboutContent(): Promise<AboutContent> {
        const aboutContentResponse = await this.client.getEntries({
            content_type: "about",
            limit: 1,
        });
        const aboutContent: any = aboutContentResponse.items[0].fields;
        return {
            aboutSectionContent: {
                title: aboutContent.aboutSection.fields.title,
                headShot: {
                    title: aboutContent.aboutSection.fields.headShot.fields.title,
                    description: aboutContent.aboutSection.fields.headShot.fields.description,
                    url: aboutContent.aboutSection.fields.headShot.fields.file.url,
                },
                aboutText: aboutContent.aboutSection.fields.aboutText,
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