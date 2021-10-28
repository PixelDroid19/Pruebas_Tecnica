import React from "react";
import { ListPatientsRisk } from "./Patients/ListPatientsRisk";
import ListPatient from "./Patients/ListPatient";
import ListPatientsCaredfor from "./Patients/ListPatientsCaredfor";
import { ExtraFeatures } from "../hooks/useFunction";
import { useSelector } from "react-redux";

export const MainPage = () => {
  const { ListPatientsCared, getMaxRisk } = ExtraFeatures();
  const { Patients } = useSelector((store) => store.Patients);

  const Listar_Pacientes_Mayor_Riesgo = getMaxRisk(Patients);
  const Pacientes_NO_Atendidos = ListPatientsCared(Patients, true);
  const Consulta_mas_Pacientes_Atendidos = ListPatientsCared(Patients, false);

  //const Paciente_Mas_Anciano
  // const Listar_Pacientes_Mayor_Riesgo = '';
  // const Listar_Pacientes_Fumadores_Urgentes = '';
  // const Consulta_mas_Pacientes_Atendidos = '';
  // const Pacientes_Atender_Paciente ='';
  // const listPatient = Patients.sort((a, b) => (a.PatientPriority > b.PatientPriority ? -1 : 1));

  return (
    <div className="ListBoxMain">
      <ListPatient listPatient={Consulta_mas_Pacientes_Atendidos} />
      <ListPatientsCaredfor ListPatientCared={Pacientes_NO_Atendidos} />
      <ListPatientsRisk listPatient={Listar_Pacientes_Mayor_Riesgo} />
    </div>
  );
};
