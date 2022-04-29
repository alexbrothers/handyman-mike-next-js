import SectionContainer from '../components/SectionContainer';
import type {GetStaticProps } from 'next';
import { ContentfulClientFactory } from '../lib/contentful';
import { WorkBeforeAfter, WorkContent } from '../utils/types';
import SectionHeader from '../components/SectionHeader';
import WorkProject from '../components/WorkProject';
import Seo from '../components/Seo';

const Work = (props: WorkContent) => {
  return (
    <>
      <Seo title={props.seo.title} description={props.seo.description} page="work" />
      <SectionContainer>
          <SectionHeader name={props.title} component="h1" />
          {props.workBeforeAfter.map(function(item: WorkBeforeAfter) {
              return (
                  <WorkProject
                      key={item.projectName}
                      projectName={item.projectName} 
                      beforeMedia={item.beforeMedia} 
                      afterMedia={item.afterMedia} 
                  />
              )
          })}
      </SectionContainer>
    </>
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
