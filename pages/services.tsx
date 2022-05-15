import SectionContainer from '../components/SectionContainer';
import type {GetStaticProps } from 'next';
import { ContentfulClientFactory } from '../lib/contentful';
import { ServiceCardProps, ServicesPageContent } from '../utils/types';
import SectionHeader from '../components/SectionHeader';
import { Box } from '@mui/material';
import Seo from '../components/Seo';
import ServiceCard from '../components/ServiceCard';

const Services = (props: ServicesPageContent) => {
  return (
    <>
        <Seo title={props.seo.title} description={props.seo.description} page="services" />
        <SectionContainer>
            <SectionHeader name={props.servicesSectionContent.header} component="h1" />
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
                        <ServiceCard key={props.name} name={props.name} subServices={props.subServices} icon={props.icon} />
                    );
                })}
            </Box>
        </SectionContainer>
    </>
  )
}

export const getStaticProps: GetStaticProps = async context => {
    const contentfulClient = await ContentfulClientFactory.getInstance();
    try {
        const servicesContent: ServicesPageContent = await contentfulClient.getServicesPageContent();
        return {
          props: servicesContent
        }
    } catch(e: any) {
        console.log(`error retrieving services content from contentful: ${e.message}`);
        throw e;
    }
  }

export default Services
