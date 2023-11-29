import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import MobileStepper from '@mui/material/MobileStepper';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import { useTheme } from '@mui/material/styles';
import * as React from 'react';
import SwipeableViews from 'react-swipeable-views';
import { autoPlay } from 'react-swipeable-views-utils';

const AutoPlaySwipeableViews = autoPlay(SwipeableViews);

const images = [
  {
    label: '',
    imgPath:
      'https://images.unsplash.com/photo-1606800052052-a08af7148866?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8bWFyaWFnZXxlbnwwfHwwfHx8MA%3D%3D',
  },
  {
    label: '',
    imgPath:
      'https://plus.unsplash.com/premium_photo-1661726486910-7cfff916caad?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTN8fGhhcHB5JTIwYmlydGhkYXl8ZW58MHx8MHx8fDA%3D',
  },
  {
    label: '',
    imgPath:
      'https://media.istockphoto.com/id/1454885967/fr/photo/des-mains-des-gens-heureux-et-des-gens-daffaires-qui-applaudissent-des-mains-pour-soutenir.webp?b=1&s=170667a&w=0&k=20&c=EfmIOJzyKpFnyFszsInaACV1b73N6XgtlUfqWUJiPic=',
  },
  {
    label: '',
    imgPath:
      'https://media.istockphoto.com/id/1137781483/fr/photo/guitariste-m%C3%A2le-noir-chantant-et-jouant-la-guitare-acoustique-sur-la-sc%C3%A8ne.webp?b=1&s=170667a&w=0&k=20&c=xNGFtDW_rUF3S-Y--eH1Q7JsHGYefXZ7yLgnfqv_rCk=',
  },
];

function Caroussel() {
  const theme = useTheme();
  const [activeStep, setActiveStep] = React.useState(0);
  const maxSteps = images.length;

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleStepChange = (step) => {
    setActiveStep(step);
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Paper
        square
        elevation={0}
        sx={{
          display: 'flex',
          alignItems: 'center',
          width: "100%",
          pl: 2,
          bgcolor: 'background.default',
        }}
      >
        <Typography>{images[activeStep].label}</Typography>
      </Paper>
      <AutoPlaySwipeableViews style={{
            width: "100%"
        }}
        axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
        index={activeStep}
        onChangeIndex={handleStepChange}
        enableMouseEvents
      >
        {images.map((step, index) => (
          <div key={step.label}>
            {Math.abs(activeStep - index) <= 2 ? (
              <Box
                component="img"
                sx={{
                  height: 400,
                  display: 'block',
                  overflow: 'hidden',
                  width: '100%',
                }}
                src={step.imgPath}
                alt={step.label}
              />
            ) : null}
          </div>
        ))}
      </AutoPlaySwipeableViews>
      <MobileStepper
        style={{
            backgroundColor: "#D8A43E"
        }}
        steps={maxSteps}
        position="static"
        activeStep={activeStep}
        nextButton={
          <Button
            size="small"
            onClick={handleNext}
            disabled={activeStep === maxSteps - 1}
            style={{
                color: "#000000"
            }}
          >
            Next
            {theme.direction === 'rtl' ? (
              <KeyboardArrowLeft />
            ) : (
              <KeyboardArrowRight />
            )}
          </Button>
        }
        backButton={
          <Button size="small" onClick={handleBack} disabled={activeStep === 0}
            style={{
                color: "#000000"
            }}  
          >
            {theme.direction === 'rtl' ? (
              <KeyboardArrowRight />
            ) : (
              <KeyboardArrowLeft />
            )}
            Back
          </Button>
        }
      />
    </Box>
  );
}

export default Caroussel;
