import * as React from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import { ExtraFeatures } from "../../hooks/useFunction";
import { useSelector } from "react-redux";

const columns = [
  { id: "firstName", label: "Nombre", minWidth: 120 },
  { id: "lastName", label: "Apellido", minWidth: 100 },
  {
    id: "age",
    label: "Edad",
    minWidth: 100,
    align: "right",
    format: (value) => value.toLocaleString("en-US"),
  },
  {
    id: "medicalHistory",
    label: "Historia medica",
    minWidth: 140,
    align: "right",
    format: (value) => value.toLocaleString("en-US"),
  },
  {
    id: "Risk",
    label: "Riesgo",
    minWidth: 130,
    align: "right",
    format: (value) => value.toFixed(2),
  },
  {
    id: "PatientPriority",
    label: "Priorida",
    minWidth: 130,
    align: "right",
    format: (value) => value.toFixed(0),
  },
];

export const ListPatientRisk = () => {
  const { Patients } = useSelector((store) => store.Patients);
  const { getMaxRisk, pediatrics, IntegralMedicine } = ExtraFeatures();
  const PatientsList = getMaxRisk(Patients);

  const pediatric = pediatrics(Patients, 15, 4);
  const integralMedicine = IntegralMedicine(Patients, 16, 4);

  console.log("integralMedicine", integralMedicine, "pediatric", pediatric,columns);

  const rows = PatientsList.sort((a, b) => (a.Risk > b.Risk ? -1 : 1));

  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(event.target.value);
    setPage(0);
  };

  return (
    <Paper sx={{ width: "100%", overflow: "hidden" }}>
      <TableContainer sx={{ maxHeight: 440 }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{ minWidth: column.minWidth }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
            
          </TableHead>
          <TableBody>
            {rows
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row) => {
                return (
                  <TableRow hover role="checkbox" tabIndex={-1} key={row.code}>
                    {columns.map((column) => {
                      const value = row[column.id];
                      return (
                        <TableCell key={column.id} align={column.align}>
                          {column.format && typeof value === "number"
                            ? column.format(value)
                            : value}
                        </TableCell>
                      );
                    })}
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
};
