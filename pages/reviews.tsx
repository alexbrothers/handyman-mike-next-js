import SectionContainer from '../components/SectionContainer';
import type {GetStaticProps } from 'next';
import { ContentfulClientFactory } from '../lib/contentful';
import { ReviewCardContent, ReviewContentfulContent, ReviewsProps } from '../utils/types';
import SectionHeader from '../components/SectionHeader';
import { Box, Button, Typography } from '@mui/material';
import Seo from '../components/Seo';
import ReviewCard from '../components/ReviewCard';

const Reviews = (props: ReviewsProps) => {
  return (
    <>
        <Seo title={props.seo.title} description={props.seo.description} page="reviews" />
        <SectionContainer>
            <SectionHeader name={props.header} component="h1" />
            <Typography variant="h5" component="h3">
                {props.slug}
            </Typography>
            <Box sx={{
                display: "flex",
                flexDirection: "column",
                gap: "25px",
                marginTop: "40px",
                marginBottom: "40px"
            }}>
                {props.reviews.map(function(review: ReviewCardContent) {
                    return <ReviewCard key={review.firstName} firstName={review.firstName} stars={review.stars} review={review.review} />
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
        </SectionContainer>
    </>
  )
}

export const getStaticProps: GetStaticProps = async context => {
    const contentfulClient = await ContentfulClientFactory.getInstance();
    try {
        const reviewsContent: ReviewContentfulContent = await contentfulClient.getReviewsContent();
        const reviews: ReviewCardContent[] = contentfulClient.getFakeReviewData();
        const result: ReviewsProps = {
            ...reviewsContent,
            reviews,
        }
        return {
          props: result
        }
    } catch(e: any) {
        console.log(`error retrieving reviews content from contentful: ${e.message}`);
        throw e;
    }
  }

export default Reviews
