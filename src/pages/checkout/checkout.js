
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import React, {useState, useEffect} from 'react';
import OrderedItem from '../../components/stepper/orderedItem/orderedItem';
import CircularProgress from '@mui/material/CircularProgress';
import SelectAddress from '../../components/stepper/selectAddress/selectAddress';
import ConfirmOrder from '../../components/stepper/confirmOrder/confirmOrder';


const steps = ['Items', 'Select Address', 'Confirm Order'];

const Checkout = () => {
    const [activeStep, setActiveStep] = useState(0);
    const [skipped, setSkipped] = useState(new Set());
    const [userId, setUserId] = useState('');
    let token = window.sessionStorage.getItem('userDetail');
    const productDetail = window.localStorage.getItem('productDetail');
    const addressId = window.localStorage.getItem('savedAddress');
    const savedProduct = JSON.parse(productDetail);
    

    const isStepOptional = (step) => {
        return step === 1;
    };

    const isStepSkipped = (step) => {
        return skipped.has(step);
    };

    const handleNext = () => {
        let newSkipped = skipped;
        if (isStepSkipped(activeStep)) {
            newSkipped = new Set(newSkipped.values());
            newSkipped.delete(activeStep);
        }

        setActiveStep((prevActiveStep) => prevActiveStep + 1);
        setSkipped(newSkipped);
    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    const handleSkip = () => {
        if (!isStepOptional(activeStep)) {
            // You probably want to guard against something like this,
            // it should never occur unless someone's actively trying to break something.
            throw new Error("You can't skip a step that isn't optional.");
        }

        setActiveStep((prevActiveStep) => prevActiveStep + 1);
        setSkipped((prevSkipped) => {
            const newSkipped = new Set(prevSkipped.values());
            newSkipped.add(activeStep);
            return newSkipped;
        });
    };

    const handleReset = () => {
        setActiveStep(0);
    };

    const handleSteps = (step) => {
        switch(step){
            case 0 : 
                return <OrderedItem />
            case 1 : 
                return <SelectAddress />
            case 2 : 
                return <ConfirmOrder />
            default : 
                return <CircularProgress />
        }
    }

    useEffect(() => {
        if(token != null){
          const userDetail = async () => {
              let response = await fetch(`http://localhost:8080/api/addresses/${addressId}`, {
                  method: 'GET',
                  headers: {
                      "Content-Type" : "application/json",
                      "Accept" : "*/*",
                      Authorization : `Bearer ${JSON.parse(token)}`
                  },
              });
              response = await response.json();
              setUserId(response);
      
          }
          userDetail();
      }
      }, []);

    const placeOrder = async () => {
        let response = await fetch("http://localhost:8080/api/orders",{
            method: 'POST',
            headers: {
                "Content-Type" : "application/json",
                "Accept" : "application/json",
                Authorization : `Bearer ${JSON.parse(token)}`
            },
            body: JSON.stringify({
                quantity : savedProduct.quantity,
                user: userId.user,
                product: savedProduct.id,
                address: addressId, 
            })
        });
        response = await response.json();
    }
    
    

    return (
        <Container maxWidth="lg">
            <Box mt={5} sx={{ width: "100%" }}>
                <Stepper activeStep={activeStep}>
                    {steps.map((label, index) => {
                    const stepProps = {};
                    const labelProps = {};
                    if (isStepSkipped(index)) {
                        stepProps.completed = false;
                    }
                    return (
                        <Step key={label} {...stepProps}>
                            <StepLabel {...labelProps}>{label}</StepLabel>
                        </Step>
                    );
                    })}
                </Stepper>
                {activeStep === steps.length ? (
                    <>
                        <Typography sx={{ mt: 2, mb: 1 }}>
                            All steps completed - you&apos;re finished
                        </Typography>
                    </>
                ) : (
                    <>
                        {handleSteps(activeStep)}

                        <Box sx={{ display: "flex", justifyContent: "space-between", flexDirection: "row", pt: 2 }}>
                            <Button
                            color="inherit"
                            disabled={activeStep === 0}
                            onClick={handleBack}
                            sx={{ mr: 1 }}
                            >
                                Back
                            </Button>
                            
                            {activeStep === steps.length - 1 ? <Button onClick={placeOrder}>
                                    Place Order
                                </Button> : <Button onClick={handleNext}>
                                    Next
                                </Button>}
                            
                        </Box>
                    </>
                )}
            </Box>
        </Container>
    );
};

export { Checkout };
