import * as React from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Checkbox from "@mui/material/Checkbox";
import IconButton from "@mui/material/IconButton";
import MedicalServicesIcon from "@mui/icons-material/MedicalServices";

export default function ListPatientsCaredfor({ ListPatientCared }) {

  return (
    <>
      {ListPatientCared !== undefined  ? (
        <List
          sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}
        >
          {ListPatientCared.map((e) => {
            const labelId = `checkbox-list-label-${e.firstName}`;
            return (
              <ListItem
                key={e.Risk}
                secondaryAction={
                  <IconButton edge="end" aria-label="comments">
                    <MedicalServicesIcon />
                  </IconButton>
                }
                disablePadding
              >
                <ListItemButton
                  role={undefined}
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
    </>
  );
}
