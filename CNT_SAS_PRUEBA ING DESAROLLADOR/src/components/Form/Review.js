import * as React from "react";
import { useDispatch } from "react-redux";
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import ImageIcon from '@mui/icons-material/Image';
import WorkIcon from '@mui/icons-material/Work';
import BeachAccessIcon from '@mui/icons-material/BeachAccess';
import Divider from '@mui/material/Divider';
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import { registerPatients } from "../../Redux/Actions/actionPatients";
import { useSelector } from "react-redux";


export default function Review({handleNext}) {
  const dispatch = useDispatch();
  const { FormData } = useSelector((store) => store.PatientForm);
  const {
    age,
    lastName,
    firstName,
    Smoke,
    SmokingYears,
    Diet,
    DietType,
    medicalHistory,
    Query,
    Height,
    Weight,
    IMC,
    nutritionalAssessment,
    PatientPriority,
    Risk,
    professional,
    attended, 
  } = FormData;

  const handleRegistro = () => {
    dispatch(
      registerPatients(
        age,
        lastName,
        firstName,
        Smoke,
        SmokingYears,
        Diet,
        DietType,
        medicalHistory,
        Query,
        Height,
        Weight,
        IMC,
        nutritionalAssessment,
        PatientPriority,
        Risk,
        professional,
        attended
      )
    );
  };

  return (
  <>
    <ListItem container="true">
      <ListItemAvatar>
        <Avatar>
          <ImageIcon />
        </Avatar>
      </ListItemAvatar>
      <ListItemText primary={firstName} secondary={lastName}  />
      <ListItemText primary={"Fuma"} secondary={Smoke === true ? 'Si': "No"} />
      <ListItemText primary={"Edad"} secondary={`${age} Años`}  />
    </ListItem>
    <Divider variant="inset" component="li" />
    <ListItem>
      <ListItemAvatar>
        <Avatar>
          <WorkIcon />
        </Avatar>
      </ListItemAvatar>
      <ListItemText primary={"Dieta"} secondary={Diet === true ? 'Si': "No"}  />
      <ListItemText primary={"Numero de Historia medico"} secondary={medicalHistory} />
      <ListItemText primary={"Prioridad"} secondary={PatientPriority}  />
    </ListItem>
    <Divider variant="inset" component="li" />
    <ListItem>
      <ListItemAvatar>
        <Avatar>
          <BeachAccessIcon />
        </Avatar>
      </ListItemAvatar>
      <ListItemText primary={"Profesionar"} secondary={professional}  />
      <ListItemText primary={"Estado nutricional"} secondary={nutritionalAssessment} />
      <ListItemText primary={"Riesgo"} secondary={Risk}  />
    </ListItem>
    <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
            
                  <Button
                    variant="contained"
                    onClick={() => {
                        handleNext();
                        handleRegistro()
                      }
                    }
                    type="submit"
                    sx={{ mt: 3, ml: 1 }}
                  > Realizar cita
                     
                  </Button>
                </Box>
</>
  );
}
