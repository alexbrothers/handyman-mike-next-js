import type {GetStaticProps } from 'next';
import HeroSection from '../components/HeroSection';
import { ContentfulClientFactory } from '../lib/contentful';
import { HomeContent } from '../utils/types';

const Home = (props: HomeContent) => {
  return (
    <HeroSection 
      headline={props.headline}
      subHeadline={props.subHeadline}
      heroText={props.heroText}
      callToActionButtonText={props.callToActionButtonText}
      subCallToActionButtonText={props.subCallToActionButtonText}
    />
  )
}

export const getStaticProps: GetStaticProps = async context => {
  const contentfulClient = await ContentfulClientFactory.getInstance();
  try {
      const homeContent: HomeContent = await contentfulClient.getHomeContent();
      return {
        props: homeContent
      }
  } catch(e: any) {
      console.log(`error retrieving home content from contentful: ${e.message}`);
      throw e;
  }
}

export default Home
