import { GetServerSideProps } from 'next';

const baseUrl: string = process.env.NEXT_PUBLIC_BASE_URL || "https://www.yaymike.com";

function generateSiteMap() {
    return `<?xml version="1.0" encoding="UTF-8"?>
        <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
        <url>
            <loc>${baseUrl}/</loc>
        </url>
        <url>
            <loc>${baseUrl}/about</loc>
        </url>
        <url>
            <loc>${baseUrl}/work</loc>
        </url>
        <url>
            <loc>${baseUrl}/reviews</loc>
        </url>
        <url>
            <loc>${baseUrl}/contact</loc>
        </url>
        </urlset>
    `
}

function SiteMap() {
    // getServerSideProps will do the heavy lifting
}

export const getServerSideProps: GetServerSideProps = async (context) => {
    const siteMap: string = generateSiteMap();
    context.res.setHeader('Content-Type', 'text/xml');
    context.res.write(siteMap);
    context.res.end();

    return {
        props: {}
    }
}

export default SiteMap