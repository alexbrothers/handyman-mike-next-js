import { createClient, ContentfulClientApi } from 'contentful';
import { AboutContent, ContactContent, HeaderContent, HomeContent, ReviewCardContent, ReviewContentfulContent, ServicesPageContent, WorkContent } from '../utils/types';

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
            leaveReviewCallToAction: homeContent.leaveReviewCallToAction,
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
            },
            {
                firstName: "Michael",
                stars: 5,
                review: "Mike was absolutely awesome. He did a great job of hanging wood carvings on a thin slab brick wall we have installed in our house and did a phenomenal job. He also helped with a couple other hanging projects. Extremely professional, very personable. I'll definitely be calling him again for any needs I have."
            },
            {
                firstName: "Colin",
                stars: 5,
                review: "We have had Mike do several projects on my mom's house over the last year, and he has done an excellent job in completing each project in a timely manner with good quality. He's definitely not your typical handyman. His skills span into multiple trades including plumbing, electrical and carpentry, and he has really good availability and communication. We definitely recommend Mike!"
            },
            {
                firstName: "Sara",
                stars: 5,
                review: "Mike responded quickly to my message and scheduled the job within days. He did a great job for us. He knew exactly what parts were needed for the job and quickly made the repairs. He even checked in the following day to ensure everything was working properly. We will be calling him for all of our future home repairs/upgrades!"
            },
            {
                firstName: "Alex",
                stars: 5,
                review: "Contacted Mike, he responded promptly and scheduled for when I was able to make it.  Mike got here on time, was very courteous, professional and clearly knew what he was doing.  The repairs were done in less time than estimated and the costs were adjusted accordingly.  The workmanship was top notch!  I am definitely going to use Mike for other jobs. Highly recommend!"
            },
            {
                firstName: "Jeanne",
                stars: 5,
                review: "Very professional, excellent work, highly recommend. He installed grab bars in our tiled shower and other items. He is a Class C contractor."
            },
            {
                firstName: "Puneeth",
                stars: 5,
                review: "Mike did a fantastic job replacing garbage disposer, he is knowledgeable, affordable, on-time. His work is top-notch. Mike is now my go-to person when I am in need of a handyman."
            },
            {
                firstName: "Bob",
                stars: 5,
                review: "Used Handyman Mike several times of household jobs. Always on time, did the job quickly and professionally. He is willing to make suggestions and I found his recommendations a better idea than my mine. He is friendly and very well organized. Rates are more than competitive. And importantly, I liked him. Recommend him without hesitation."
            },
            {
                firstName: "Phillip",
                stars: 5,
                review: "5 star. HIGHLY RECOMMEND!!!.  Did a professional job and in a timely manner.   Very reasonable and neat.   I will definitely be calling Handyman Mike for future home projects."
            },
            {
                firstName: "Christopher",
                stars: 5,
                review: "Quick, clean, and an honest professional. Something that had been on our to-do list since before we moved in was solved in an hour at an incredibly fair rate."
            },
            {
                firstName: "Richard",
                stars: 5,
                review: "Mike did excellent work for me replacing an outdoor flood light. Will use him again and recommend him to neighbors."
            },
            {
                firstName: "Robert",
                stars: 5,
                review: "Mike was on time and completed the repairs in minutes    In addition he followed up later to make sure things were working properly.  Just don’t see this type of quality service.  I will be calling him if I need anything."
            },
            {
                firstName: "Lauren",
                stars: 5,
                review: "I would highly recommend Mike to get your job done.  He has been here several times in the last few weeks, hanging the TV, pictures, new light fixtures, shelves and more.  Each job was done professionally and with care.  He has a great deal of experience and makes certain to do each task properly.  He is now on my speed dial!!"
            },
            {
                firstName: "Tommy",
                stars: 5,
                review: "Very pleased with the professionalism and knowledge Mike displays on the job. Did a great job in a very timely manner"
            },
            {
                firstName: "Mary",
                stars: 5,
                review: "Mike was the best! He was responsive and got things done promptly. He removed an outdoor lamppost that had fallen over and replaced it with a new one. He put the new one in the ground with cement, tranferred the wiring, added the light fixture, and light bulbs and it works perfectly. We will definitely be using him in the future. Highly recommend!"
            },
            {
                firstName: "Matthew",
                stars: 5,
                review: "Mike can do it all and is timely and professional. Fair value!"
            },
            {
                firstName: "Cindy",
                stars: 5,
                review: "I am so glad to have found Mike! He is friendly, knowledgeable, informative and his work is top-notch. Mike is now my go-to person when I am in need of a handyman!"
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
            subHeader: reviewsContent.subHeader,
            slug: reviewsContent.slug,
            leaveReviewCallToAction: reviewsContent.leaveReviewCallToAction,
            seo: {
                title: reviewsContent.seo.fields.title,
                description: reviewsContent.seo.fields.description,
            }
        }
    }

    async getServicesPageContent(): Promise<ServicesPageContent> {
        const servicesContentResponse = await this.client.getEntries({
            content_type: "services",
            limit: 1,
        });
        const servicesContent: any = servicesContentResponse.items[0].fields;
        return {
            seo: {
                title: servicesContent.seo.fields.title,
                description: servicesContent.seo.fields.description,
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