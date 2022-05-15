import { Box, Typography, Button } from '@mui/material';
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
        leaveReviewCallToAction={props.leaveReviewCallToAction}
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
            <ReviewCard key={review.firstName} firstName={review.firstName} stars={review.stars} review={review.review} />
          )
        })}
      </Box>
      <Box sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          marginTop: "120px",
          marginBottom: "40px",
          gap: "25px"
      }}>
          <Typography variant="h5" component="h3" textAlign="center">
              {props.leaveReviewCallToAction}
          </Typography>
          <Button
              component="a"
              variant="contained"
              size="large"
              href="https://g.page/r/CVPQr4rOPtCjEAg/review"
              target="_blank"
          >
              Leave a Review
          </Button>
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
