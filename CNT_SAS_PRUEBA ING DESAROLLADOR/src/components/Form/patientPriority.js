import * as React from "react";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import { useSelector } from "react-redux";
import { IMC } from "../../hooks/useFunction";
import Select from "@mui/material/Select";
import { useForm } from "../../hooks/useForm";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import { PatientsFormData } from "../../Redux/Actions/actionPatients";
import {  useDispatch } from "react-redux";

export default function PriorityPatient({
  handleNext,
  handleBack,
  professionals,
}) {
  const dispatch = useDispatch();
  const { FormData } = useSelector((store) => store.PatientForm);
  const {
    imc,
    priority,
    priorityYoung,
    priorityAdult,
    risk,
    NutritionalAssessment,
  } = IMC(FormData.Weight, FormData.Height);

  const PrioritySelect = (Age, Smoke = false, SmokeYears = 0) => {
    if (Age > 1 && Age < 16) {
      return Math.round(priority(parseInt(Age), parseInt(FormData.Weight), (FormData.Height)));
    } else if (Age > 16 && Age < 40 && Smoke === true) {
      return Math.round(priorityYoung(Smoke, SmokeYears));
    } else if (Age > 16 && Age < 40 && Smoke === false) {
      return Math.round(priorityYoung(Smoke));
    } else if (Age >= 41 && Age < 100) {
      return Math.round(priorityAdult(FormData.Diet, parseInt(Age)));
    }
  };

  const [values, handleInputChange] = useForm({ professional: "" });
  const { professional, state } = values;

  //Object
  const Datos = {
    IMC: imc.toFixed(1),
    nutritionalAssessment: NutritionalAssessment(),
    PatientPriority: Math.round(PrioritySelect(
      FormData.age,
      FormData.Smoking,
      FormData.SmokingYears
    )),
    Risk: risk(
      FormData.age,
      PrioritySelect(FormData.age, FormData.Smoking, FormData.SmokingYears)
    ).toFixed(1),
    professional: professional,
    state: state,
  };

  //Combinar objectos

  const Next = () => {
    const combine = { ...FormData, ...Datos };
    dispatch(PatientsFormData(combine));
    console.log(combine);
  };

  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Prioridad
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={6} md={6}>
          <TextField
            required
            id="IMC"
            label="IMC"
            value={imc.toFixed(1)}
            fullWidth
            autoComplete="IMC"
            variant="standard"
            readOnly
          />
        </Grid>
        <Grid item xs={6} md={6}>
          <TextField
            required
            id="nutritionalAssessment"
            name="nutritionalAssessment"
            label="Valoración nutricional"
            value={NutritionalAssessment()}
            fullWidth
            autoComplete="NutritionalAssessment"
            variant="standard"
            readOnly
          />
        </Grid>

        <Grid item xs={6} md={6}>
          <TextField
            required
            id="PatientPriority"
            label="Prioridad de paciente"
            value={PrioritySelect(
              FormData.age,
              FormData.Smoking,
              FormData.SmokingYears
            )}
            fullWidth
            autoComplete="PatientPriority"
            variant="standard"
          />
        </Grid>
        <Grid item xs={6} md={6}>
          <TextField
            required
            id="risk"
            label="Riesgo"
            value={risk(
              FormData.age,
              PrioritySelect(
                FormData.age,
                FormData.Smoking,
                FormData.SmokingYears
              )
            ).toFixed(1)}
            fullWidth
            autoComplete="cc-number"
            variant="standard"
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <FormControl variant="standard" sx={{ width: "100%" }}>
            <InputLabel id="select-standard-label">Profesional</InputLabel>
            <Select
              labelId="Select-standard-label"
              id="Select-standard"
              name="professional"
              value={professional}
              onChange={handleInputChange}
            >
              <MenuItem value="">
                <em>Ninguno</em>
              </MenuItem>
              {professionals !== undefined ? (
                professionals.map((professional) => (
                  <MenuItem key={professional.id} value={professional.name}>
                    {professional.name}
                  </MenuItem>
                ))
              ) : (
                <MenuItem value={"Loading"}>Loading</MenuItem>
              )}
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            required
            id="state"
            label="Estado"
            helperText="Estado de la consulta"
            fullWidth
            autoComplete="cc-csc"
            variant="standard"
          />
        </Grid>
      </Grid>

      <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
        <Button
          variant="contained"
          onClick={() => {
            Next();
            handleNext();
          }}
          type="submit"
          sx={{ mt: 3, ml: 1 }}
        >
          Siguiente
        </Button>
      </Box>
    </React.Fragment>
  );
}
