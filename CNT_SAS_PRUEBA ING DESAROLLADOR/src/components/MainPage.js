import React from "react";
import { ListPatientsRisk } from "./Patients/ListPatientsRisk";
import ListPatientCustom from "./Patients/ListPatientCustom";
import { ExtraFeatures } from "../hooks/useFunction";
import { useSelector } from "react-redux";
import PrimarySearchAppBar from "../components/AppBar/AppBar";
//Iconos
import TimerIcon from "@mui/icons-material/Timer";
import MedicalServicesIcon from "@mui/icons-material/MedicalServices";

export const MainPage = () => {
  const { ListPatientsCared, getMaxRisk } = ExtraFeatures();
  const { Patients } = useSelector((store) => store.Patients);
  const { urgency } = useSelector((store) => store.Urgency);
  let Pacientes_No_Atendidos = [],
    Pacientes_Atendidos = [],
    Listar_Pacientes_Mayor_Riesgo = [];

  if (urgency === undefined || Patients === null) {
    console.log("No hay pacientes");
  } else {
    Listar_Pacientes_Mayor_Riesgo = getMaxRisk(Patients);
    Pacientes_No_Atendidos = ListPatientsCared(urgency, false);
    Pacientes_Atendidos = ListPatientsCared(Patients, true);
  }

  //const Paciente_Mas_Anciano = ListPatientsCared(Patients, "Old");

  //const Paciente_Mas_Anciano
  // const Listar_Pacientes_Mayor_Riesgo = '';
  // const Listar_Pacientes_Fumadores_Urgentes = '';
  // const Consulta_mas_Pacientes_Atendidos = '';
  // const Pacientes_Atender_Paciente ='';
  // const listPatient = Patients.sort((a, b) => (a.PatientPriority > b.PatientPriority ? -1 : 1));

  return (
    <>
      <PrimarySearchAppBar />
      <div className="ListBoxMain">
        <ListPatientCustom
          listPatient={Pacientes_No_Atendidos}
          RoomName={"Sala de espera"}
          Icon={TimerIcon}
        />

        <ListPatientCustom
          listPatient={Pacientes_Atendidos}
          RoomName={"Pacientes Atendidos"}
          Icon={MedicalServicesIcon}
        />

        <ListPatientsRisk listPatient={Listar_Pacientes_Mayor_Riesgo} />
      </div>
    </>
  );
};
