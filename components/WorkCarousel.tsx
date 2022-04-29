import * as React from 'react';
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import MobileStepper from '@mui/material/MobileStepper';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
import SwipeableViews from 'react-swipeable-views';
import { autoPlay } from 'react-swipeable-views-utils';
import { ContentfulMedia, WorkCarouselContent } from '../utils/types';
import Image from 'next/image';

const AutoPlaySwipeableViews = autoPlay(SwipeableViews);

function WorkCarousel(props: WorkCarouselContent) {
  const theme = useTheme();
  const [activeStep, setActiveStep] = React.useState(0);
  const maxSteps = props.media.length;

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1 % maxSteps);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1 % maxSteps);
  };

  const handleStepChange = (step: number) => {
    setActiveStep(step);
  };

  return (
    <Box sx={{ maxWidth: 600, flexGrow: 1, flex: 1 }}>
      <Box sx={{
          height: 400,
          display: 'block',
          maxWidth: 600,
          overflow: 'hidden',
          width: '100%',
          position: "relative",
          backgroundColor: "rgba(0, 0, 0, 0.2)",
      }}>
        <Box sx={{
            backgroundColor: "rgba(0, 0, 0, 0.6)",
            position: "absolute",
            bottom: 0,
            width: "100%",
            color: "white",
            zIndex: 1,
            padding: "5px"
        }}>
            {props.isBefore ? "Before" : "After"}
        </Box>
        <AutoPlaySwipeableViews
            axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
            index={activeStep}
            onChangeIndex={handleStepChange}
            enableMouseEvents
        >
            {props.media.map(function(media: ContentfulMedia, index) {
                return (
                  <Image
                    alt={media.title} 
                    src={`https:${media.url}`}
                    layout="responsive"
                    width={600}
                    height={400}
                    objectFit="contain"
                    quality={100}
                    placeholder="blur"
                    blurDataURL='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8kMpQDwAFeAHWPyptaQAAAABJRU5ErkJggg=='
                />
                    // <Box component="img" src={props.media[index].url} sx={{
                    //     height: 400,
                    //     display: 'block',
                    //     maxWidth: 600,
                    //     overflow: 'hidden',
                    //     width: '100%',
                    //     objectFit: "contain"
                    // }}
                    // />
                )
            })}
        </AutoPlaySwipeableViews>
      </Box>
      <MobileStepper
        steps={maxSteps}
        position="static"
        activeStep={activeStep}
        nextButton={
          <Button
            size="small"
            onClick={handleNext}
            disabled={activeStep === maxSteps - 1}
          >
            {theme.direction === 'rtl' ? (
              <KeyboardArrowLeft />
            ) : (
              <KeyboardArrowRight />
            )}
          </Button>
        }
        backButton={
          <Button size="small" onClick={handleBack} disabled={activeStep === 0}>
            {theme.direction === 'rtl' ? (
              <KeyboardArrowRight />
            ) : (
              <KeyboardArrowLeft />
            )}
          </Button>
        }
      />
    </Box>
  );
}

export default WorkCarousel;