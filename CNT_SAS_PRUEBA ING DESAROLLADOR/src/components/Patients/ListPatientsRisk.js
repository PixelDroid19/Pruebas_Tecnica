import * as React from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Checkbox from "@mui/material/Checkbox";
import IconButton from "@mui/material/IconButton";
import WarningIcon from "@mui/icons-material/Warning";

export const ListPatientsRisk = ({ listPatient }) => {
  return (
    <div className="ListBox">
      <h4>Pacientes con mayor Riesgo</h4>
      {listPatient !== undefined ? (
        <List sx={{ bgcolor: "background.paper" }}>
          {listPatient.map((e, index) => {
            const labelId = `checkbox-list-label-${e.firstName}`;
            return (
              <ListItem
                className="ListItem"
                key={index}
                secondaryAction={
                  <IconButton edge="end" aria-label="comments">
                    <WarningIcon />
                  </IconButton>
                }
                disablePadding
              >
                <ListItemButton role={undefined}>
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
                    secondary={`Histora medica Nº ${e.medicalHistory} | Riegos: ${e.Risk} `}
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
};
