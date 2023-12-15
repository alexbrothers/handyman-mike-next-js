import SectionContainer from '../components/SectionContainer';
import type {GetStaticProps } from 'next';
import { ContentfulClientFactory } from '../lib/contentful';
import { ReviewCardContent, ReviewContentfulContent, ReviewsProps } from '../utils/types';
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';
import { BLOCKS } from '@contentful/rich-text-types';
import SectionHeader from '../components/SectionHeader';
import { Box, Button, Typography } from '@mui/material';
import Seo from '../components/Seo';
import ReviewCard from '../components/ReviewCard';
import { ReactChild, ReactFragment, ReactPortal } from 'react';

const Reviews = (props: ReviewsProps) => {
  return (
    <>
        <Seo title={props.seo.title} description={props.seo.description} page="reviews" />
        <SectionContainer>
            <SectionHeader name={props.header} component="h1" />
            <Box sx={{
                "a": {
                    color: "primary.main",
                    textDecoration: "none",
                },
                "a:hover": {
                    textDecoration: "underline",
                }
            }}>
                {documentToReactComponents(
                    props.subHeader,
                    {
                        renderNode: {
                            [BLOCKS.PARAGRAPH]: (_node: any, children: any) => <Typography variant="h5" component="h3">{children}</Typography>
                        }
                    }
                )}
            </Box>
            <Box sx={{
                display: "grid",
                gridTemplateColumns: {
                    xs: "1fr",
                    md: "1fr 1fr"
                },
                gridGap: "35px",
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
