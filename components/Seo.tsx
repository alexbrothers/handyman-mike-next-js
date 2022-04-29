import Head from "next/head";
import { SeoProps } from "../utils/types";

export default function Seo(props: SeoProps) {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "https://www.yaymike.com";
    const canonicalUrl = process.env.NEXT_PUBLIC_CANONICAL_URL || "https://www.yaymike.com";

    return (
        <Head>
            <title>{props.title}</title>
            <meta
                name="description"
                content={props.description}
                key="desc"
            />
            <meta
                property="og:title"
                content={props.title}
            />
            <meta
                property="og:description"
                content={props.description}
            />
            <meta
                property="og:image"
                content={`${baseUrl}/handyman_mike_logo_light.png`}
            />
            <meta
                property="og:url"
                content={`${canonicalUrl}/${props.page}`}
            />
            <link
                rel="canonical"
                href={`${canonicalUrl}/${props.page}`}
                key="canonical"
            />
        </Head>
    )
}