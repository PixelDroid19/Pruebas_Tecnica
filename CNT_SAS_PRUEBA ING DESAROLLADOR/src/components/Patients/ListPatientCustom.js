import * as React from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Checkbox from "@mui/material/Checkbox";
import IconButton from "@mui/material/IconButton";
import BorderColorIcon from '@mui/icons-material/BorderColor';
import { useDispatch, useSelector } from "react-redux";
import { EditarData } from "../../Redux/Actions/actionPatients";
import { ExtraFeatures } from "../../hooks/useFunction";

export default function ListPatientCustom({ listPatient, RoomName, Icon = null }) {
  const dispatch = useDispatch();
  const { Patients } = useSelector((store) => store.Patients);
  const { PatientsFind } = ExtraFeatures();
  console.log(listPatient);
  const handleToggle = (Firstname, Lastname, Num, attended) => () => {
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
    } = PatientsFind(Patients, Firstname, Lastname, Num);

    dispatch(
      EditarData(
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
    <div className="ListBox">
      <h3>{RoomName}</h3>
      {listPatient !== null || listPatient.length !== 0 ? (
        <List
          sx={{
            width: "100%",
            maxWidth: 360,
            bgcolor: "background.paper",
            position: "relative",
            overflow: "auto",
            maxHeight: 300,
            "& ul": { padding: 0 },
          }}
        >
          {listPatient.map((e, index) => {
            const labelId = `checkbox-list-label-${e.firstName}`;

            return (
              <ListItem
                key={index}
                className="ListItem"
                secondaryAction={
                  Icon !== null ? (
                    <IconButton edge="end" aria-label="comments">
                      <Icon />
                    </IconButton>
                  ) : (
                    <IconButton edge="end" aria-label="comments">
                      <BorderColorIcon />
                    </IconButton>
                  )
                }
                disablePadding
              >
                <ListItemButton
                  role={undefined}
                  onClick={handleToggle(
                    e.firstName,
                    e.lastName,
                    e.medicalHistory,
                    !e.attended
                  )}
                  dense
                >
                  <ListItemIcon>
                    <Checkbox
                      edge="start"
                      checked={e.attended}
                      tabIndex={-1}
                      disableRipple
                      inputProps={{ "aria-labelledby": labelId }}
                    />
                  </ListItemIcon>
                  <ListItemText
                    id={labelId}
                    primary={`${e.firstName} ${e.lastName}`}
                    secondary={`Histora medica Nº ${e.medicalHistory} | Prioridad: ${e.PatientPriority} `}
                  />
                </ListItemButton>
              </ListItem>
            );
          })}
        </List>
      ) : (
        <div>Loading</div>
      )}
    </div>
  );
}
