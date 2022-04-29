import { Box } from '@mui/material';
import type {GetStaticProps } from 'next';
import HeroSection from '../components/HeroSection';
import ReviewCard from '../components/ReviewCard';
import SectionHeader from '../components/SectionHeader';
import Seo from '../components/Seo';
import { ContentfulClientFactory } from '../lib/contentful';
import { HomeContent, HomeProps, ReviewCardContent } from '../utils/types';

const Home = (props: HomeProps) => {
  return (
    <>
      <Seo title={props.seo.title} description={props.seo.description} page="" />
      <HeroSection 
        headline={props.headline}
        subHeadline={props.subHeadline}
        heroText={props.heroText}
        callToActionButtonText={props.callToActionButtonText}
        subCallToActionButtonText={props.subCallToActionButtonText}
        seo={props.seo}
      />
      <SectionHeader name="Recent Reviews" component="h2" />
      <Box sx={{
        display: "flex",
        flexDirection: {
          xs: "column",
          md: "row"
        },
        justifyContent: "center",
        alignItems: "center",
        marginBottom: "40px",
        gap: "20px"
      }}>
        {props.recentReviews.map(function(review: ReviewCardContent) {
          return (
            <ReviewCard firstName={review.firstName} stars={review.stars} review={review.review} />
          )
        })}
      </Box>
    </>
  )
}

export const getStaticProps: GetStaticProps = async context => {
  const contentfulClient = await ContentfulClientFactory.getInstance();
  try {
      const homeContent: HomeContent = await contentfulClient.getHomeContent();
      const recentReviews: ReviewCardContent[] = contentfulClient.getFakeReviewData();
      const result: HomeProps = {
        ...homeContent,
        recentReviews,
      }
      return {
        props: result
      }
  } catch(e: any) {
      console.log(`error retrieving home content from contentful: ${e.message}`);
      throw e;
  }
}

export default Home
