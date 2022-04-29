import SectionContainer from '../components/SectionContainer';
import type {GetStaticProps } from 'next';
import { ContentfulClientFactory } from '../lib/contentful';
import { AboutContent, ServiceCardProps } from '../utils/types';
import SectionHeader from '../components/SectionHeader';
import { Box, Typography } from '@mui/material';
import Image from 'next/image';
import ServiceCard from '../components/ServiceCard';
import Seo from '../components/Seo';

const MAX_IMAGE_WIDTH = 366;
const MAX_IMAGE_HEIGHT = 450;
const MAX_IMAGE_WIDTH_MOBILE = 244;
const MAX_IMAGE_HEIGHT_MOBILE = 300;

const About = (props: AboutContent) => {
  return (
    <SectionContainer>
        <Seo title={props.seo.title} description={props.seo.description} page="about" />
        <SectionHeader name={props.aboutSectionContent.title} component="h1" />
        <Box sx={{
            display: "flex",
            flexDirection: {
                xs: "column",
                md: "row",
            },
            alignItems: "center",
            justifyContent: "space-between",
            columnGap: {
                xs: 0,
                md: "50px"
            },
            rowGap: {
                xs: "50px",
                md: 0,
            }
        }}>
            <Box component="div" sx={{
                minWidth: {
                    xs: `${MAX_IMAGE_WIDTH_MOBILE}px`,
                    md: `${MAX_IMAGE_WIDTH}px`,
                }, 
                minHeight: {
                    xs: `${MAX_IMAGE_HEIGHT_MOBILE}px`,
                    md: `${MAX_IMAGE_HEIGHT}px`,
                }
            }}>
                <Image
                    alt={props.aboutSectionContent.headShot.description} 
                    src={`https:${props.aboutSectionContent.headShot.url}`}
                    layout="responsive"
                    width={MAX_IMAGE_WIDTH}
                    height={MAX_IMAGE_HEIGHT}
                    style={{
                        borderRadius: "50%"
                    }}
                />
            </Box>
            <Typography paragraph>
                {props.aboutSectionContent.aboutText}
            </Typography>
        </Box>
        <SectionHeader name={props.servicesSectionContent.header} component="h1" gutterTop />
        <Box sx={{
            display: "grid",
            justifyContent: "center",
            gridTemplateColumns: {
                xs: "1fr",
                md: "1fr 1fr 1fr",
            },
            gridGap: "35px",
        }}>
            {props.servicesSectionContent.services.map(function(props: ServiceCardProps) {
                return (
                    <ServiceCard name={props.name} subServices={props.subServices} icon={props.icon} />
                );
            })}
        </Box>
    </SectionContainer>
  )
}

export const getStaticProps: GetStaticProps = async context => {
    const contentfulClient = await ContentfulClientFactory.getInstance();
    try {
        const aboutContent: AboutContent = await contentfulClient.getAboutContent();
        return {
          props: aboutContent
        }
    } catch(e: any) {
        console.log(`error retrieving about content from contentful: ${e.message}`);
        throw e;
    }
  }

export default About
