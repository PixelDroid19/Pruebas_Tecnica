import React from "react";
import { ListPatientsRisk } from "./Patients/ListPatientsRisk";
import ListPatient from "./Patients/ListPatient";
import ListPatientsCaredfor from "./Patients/ListPatientsCaredfor";
import { ExtraFeatures } from "../hooks/useFunction";
import { useSelector } from "react-redux";
import PrimarySearchAppBar from "../components/AppBar/AppBar";

export const MainPage = () => {
  const { ListPatientsCared, getMaxRisk } = ExtraFeatures();
  const { Patients } = useSelector((store) => store.Patients);

  const Listar_Pacientes_Mayor_Riesgo = getMaxRisk(Patients);
  const Pacientes_No_Atendidos = ListPatientsCared(Patients, false);
  const Pacientes_Atendidos = ListPatientsCared(Patients, true);
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
        <ListPatient listPatient={Pacientes_No_Atendidos} />
        <ListPatientsCaredfor ListPatientCared={Pacientes_Atendidos} />
        <ListPatientsRisk listPatient={Listar_Pacientes_Mayor_Riesgo} />
      </div>
    </>
  );
};
