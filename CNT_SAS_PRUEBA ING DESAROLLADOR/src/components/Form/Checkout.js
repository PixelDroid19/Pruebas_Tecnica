import * as React from "react";
//Material UI
import CssBaseline from "@mui/material/CssBaseline";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Toolbar from "@mui/material/Toolbar";
import Paper from "@mui/material/Paper";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Button from "@mui/material/Button";
import Link from "@mui/material/Link";
import Typography from "@mui/material/Typography";
import { createTheme, ThemeProvider } from "@mui/material/styles";
//Components
import DataForm from "./DataForm";
import PriorityPatient from "./patientPriority";
import Review from "./Review";
//Hook
import { useForm } from "../../hooks/useForm";
import { ActionButton, StepContent, StepTitle } from "../../hooks/useFunction";
//Redux
import { useSelector, useDispatch } from "react-redux";
import { PatientsFormData } from "../../Redux/Actions/actionPatients";
//Json
import { Professionals } from "../../Data/Professionals.json";

function Copyright() {
  return (
    <Typography variant="body2" color="text.secondary" align="center">
      {"Copyright © "}
      <Link color="inherit" href="">
        Your Website
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const { steps } = StepTitle("Paso1", "Paso2", "Paso3");
const theme = createTheme();

export default function Checkout() {
  const dispatch = useDispatch();
  const { getStepContent } = StepContent();
  const { FormData } = useSelector((store) => store.PatientForm);
  const { handleNext, handleBack, activeStep } = ActionButton();

  const [values, handleInputChange] = useForm({
    age: FormData !== undefined ? FormData.age : "",
    firstName: FormData !== undefined ? FormData.firstName : "",
    lastName: FormData !== undefined ? FormData.lastName : "",
    Query: FormData !== undefined ? FormData.Query : "",
    Smoke: FormData !== undefined ? FormData.Smoke : false,
    SmokingYears: FormData !== undefined ? FormData.SmokingYears : "0",
    Diet: FormData !== undefined ? FormData.Diet : "false",
    DietType: FormData !== undefined ? FormData.DietType : "",
    medicalHistory: FormData !== undefined ? FormData.medicalHistory : "",
    Height: FormData !== undefined ? FormData.Height : "",
    Weight: FormData !== undefined ? FormData.Weight : "",
    attended: false,
  });

  const {
    age,
    firstName,
    lastName,
    Query,
    Smoke,
    SmokingYears,
    Diet,
    DietType,
    medicalHistory,
    Height,
    Weight,
    attended,
  } = values;

  console.log(
    "Pincipal",
    attended, 
    age,
    firstName,
    lastName,
    Query,
    Smoke,
    SmokingYears,
    Diet,
    DietType,
    medicalHistory,
    Height,
    Weight
  );

  const handleSubmit = () => {
    dispatch(PatientsFormData(values));
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AppBar
        position="absolute"
        color="default"
        elevation={0}
        sx={{
          position: "relative",
          borderBottom: (t) => `1px solid ${t.palette.divider}`,
        }}
      >
        <Toolbar>
          <Typography variant="h6" color="inherit" noWrap>
            Clínica CNT
          </Typography>
        </Toolbar>
      </AppBar>
      <Container component="main" maxWidth="sm" sx={{ mb: 4 }}>
        <Paper
          variant="outlined"
          sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}
        >
          <Typography component="h1" variant="h4" align="center">
            Reservar
          </Typography>
          <Stepper activeStep={activeStep} sx={{ pt: 3, pb: 5 }}>
            {steps.map((label) => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>
          <React.Fragment>
            {activeStep === steps.length ? (
              <React.Fragment>
                <Typography variant="h5" gutterBottom>
                  Gracias por reservar con nosotros 
                </Typography>
                <Typography variant="subtitle1">
                  La cita ha sido envidada al medico seleccionado. 
                  En breve se le notificara por correo.
                </Typography>
              </React.Fragment>
            ) : (
              <React.Fragment>
                {getStepContent(
                  activeStep,
                  <DataForm
                    handleNext={handleNext}
                    handleBack={handleBack}
                    values={values}
                    handleInputChange={handleInputChange}
                  />,
                  <PriorityPatient  handleNext={handleNext} professionals={Professionals} />,
                  <Review Props={activeStep} handleNext={handleNext}/>
                )}
                { activeStep !== 1 && activeStep !== 2 ?
                <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
                  {activeStep !== 0 && (
                    <Button onClick={handleBack} sx={{ mt: 3, ml: 1 }}>
                      Atrás
                    </Button>
                  )}

                  <Button
                    variant="contained"
                    onClick={() => {
                      if (activeStep === 0) {
                        handleNext();
                        handleSubmit();
                      } else {
                        handleNext();
                      }
                    }}
                    type="submit"
                    sx={{ mt: 3, ml: 1 }}
                  >
                    {activeStep === steps.length - 1
                      ? "Realizar cita"
                      : "Siguiente"}
                  </Button>
                </Box> : <></>
                }
              </React.Fragment>
            )}
          </React.Fragment>
        </Paper>
        <Copyright />
      </Container>
    </ThemeProvider>
  );
}
