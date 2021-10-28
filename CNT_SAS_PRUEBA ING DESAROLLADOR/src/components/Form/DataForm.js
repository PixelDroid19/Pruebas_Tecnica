import * as React from "react";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import InputAdornment from "@mui/material/InputAdornment";


export default function DataForm({ handleInputChange, values }) {

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
  } = values;

  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Consulta medica
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="firstName"
            name="firstName"
            label="Nombre"
            value={firstName}
            onChange={handleInputChange}
            fullWidth
            autoComplete="given-name"
            variant="standard"
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="lastName"
            name="lastName"
            label="Apellido"
            value={lastName}
            onChange={handleInputChange}
            fullWidth
            autoComplete="family-name"
            variant="standard"
          />
        </Grid>
        <Grid item xs={4}>
          <FormControl variant="standard" sx={{ width: "100%" }}>
            <InputLabel id="demo-simple-select-standard-label">
              Tipo de consulta
            </InputLabel>
            <Select
              labelId="Select-standard-label"
              id="Select-standard"
              value={Query}
              name="Query"
              onChange={handleInputChange}
            >
              <MenuItem value="">
                <em>Ninguno</em>
              </MenuItem>
              <MenuItem value={"pediatrics"}>PEDIATRÍA</MenuItem>
              <MenuItem value={"urgency"}>URGENCIAS</MenuItem>
              <MenuItem value={"integralMedicine"}>MEDICINA INTEGRAL</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={4}>
          <TextField
            required
            id="age"
            name="age"
            label="Edad"
            value={age}
            onChange={handleInputChange}
            fullWidth
            autoComplete="age"
            variant="standard"
          />
        </Grid>
        <Grid item xs={4}>
          <TextField
            required
            id="medicalHistory"
            name="medicalHistory"
            label="Numero de historia clínica,"
            value={medicalHistory}
            onChange={handleInputChange}
            fullWidth
            autoComplete="medicalHistory"
            variant="standard"
          />
        </Grid>

        <Grid item xs={12} sm={6}>
          <TextField
            id="Weight"
            name="Weight"
            label="Peso"
            value={Weight}
            onChange={handleInputChange}
            fullWidth
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">kg</InputAdornment>
              ),
            }}
            variant="standard"
          />
        </Grid>

        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="Height"
            name="Height"
            label="Altura/Estatura"
            value={Height}
            onChange={handleInputChange}
            fullWidth
            autoComplete="Height"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">cm</InputAdornment>
              ),
            }}
            variant="standard"
          />
        </Grid>
        {age > 16 && age <= 40 ? (
          <>
            <Grid item xs={age > 16 && age <= 40 ? 6 : 12} sm={6}>
              <FormControl variant="standard" sx={{ width: "100%" }}>
                <InputLabel id="demo-simple-select-standard-label">
                  ¿Fumas?
                </InputLabel>
                <Select
                  labelId="Select-standard-label"
                  id="Select-standard"
                  value={Smoke}
                  name="Smoke"
                  onChange={handleInputChange}
                >
                  <MenuItem value="">
                    <em>Ninguno</em>
                  </MenuItem>
                  <MenuItem value={true}>Si</MenuItem>
                  <MenuItem value={false}>No</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={6}>
              <TextField
                required
                id="SmokingYears"
                name="SmokingYears"
                label="¿Cuantos años has fumando?"
                value={SmokingYears}
                onChange={handleInputChange}
                fullWidth
                autoComplete="SmokingYears"
                variant="standard"
              />
            </Grid>
          </>
        ) : (
          <> </>
        )}
        {age > 40 ? (
          <>
            <Grid item xs={12} sm={6}>
              <FormControl variant="standard" sx={{ width: "100%" }}>
                <InputLabel id="demo-simple-select-standard-label">
                  ¿Tiene dieta asignada.?
                </InputLabel>
                <Select
                  labelId="Select-standard-label"
                  id="Select-standard"
                  value={Diet}
                  name="Diet"
                  onChange={handleInputChange}
                >
                  <MenuItem value={true}>Si</MenuItem>
                  <MenuItem value={false}>No</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={6}>
              <FormControl variant="standard" sx={{ width: "100%" }}>
                <InputLabel id="demo-simple-select-standard-label">
                  ¿Tiene dieta asignada.?
                </InputLabel>
                <Select
                  labelId="Select-standard-label"
                  id="Select-standard"
                  value={DietType}
                  name="DietType"
                  onChange={handleInputChange}
                >
                  <MenuItem value={"basal"}>Dieta basal</MenuItem>
                  <MenuItem value={"liquid"}>Dieta líquida</MenuItem>
                  <MenuItem value={"semi-liquid"}>Dieta semilíquida</MenuItem>
                  <MenuItem value={"soft"}>Dieta blanda</MenuItem>
                  <MenuItem value={"astringent"}>Dieta astringente</MenuItem>
                  <MenuItem value={"special"}>Dieta especial</MenuItem>
                  <MenuItem value={"hypocaloric"}>Dieta hipocalórica</MenuItem>
                  <MenuItem value={"absoluteOrfasting"}>
                    Dieta absoluta o ayuno
                  </MenuItem>
                </Select>
              </FormControl>
            </Grid>
          </>
        ) : (
          <> </>
        )}
      </Grid>
    </React.Fragment>
  );
}
