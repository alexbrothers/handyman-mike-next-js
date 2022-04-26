import SectionContainer from '../components/SectionContainer';
import type {GetStaticProps } from 'next';
import { ContentfulClientFactory } from '../lib/contentful';
import { WorkBeforeAfter, WorkContent } from '../utils/types';
import SectionHeader from '../components/SectionHeader';
import WorkCarousel from '../components/WorkCarousel';
import WorkProject from '../components/WorkProject';

const Work = (props: WorkContent) => {
  return (
    <SectionContainer>
        <SectionHeader name={props.title} component="h1" />
        {props.workBeforeAfter.map(function(item: WorkBeforeAfter) {
            return (
                <WorkProject 
                    projectName={item.projectName} 
                    beforeMedia={item.beforeMedia} 
                    afterMedia={item.afterMedia} 
                />
            )
        })}
    </SectionContainer>
  )
}

export const getStaticProps: GetStaticProps = async context => {
    const contentfulClient = await ContentfulClientFactory.getInstance();
    try {
        const workContent: WorkContent = await contentfulClient.getWorkContent();
        return {
          props: workContent
        }
    } catch(e: any) {
        console.log(`error retrieving work content from contentful: ${e.message}`);
        throw e;
    }
  }

export default Work
