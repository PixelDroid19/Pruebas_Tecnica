import React from "react";
import { ListPatientRisk } from "./Patients/ListPatientsRisk";
import ListPatient from "./Patients/ListPatient"
import ListPatientsCaredfor from "./Patients/ListPatientsCaredfor"
import { ExtraFeatures } from "../hooks/useFunction";
import { useSelector } from "react-redux";


export const MainPage = () => {
  const { ListPatientsCared } = ExtraFeatures();
  const { Patients } = useSelector((store) => store.Patients);

  const ListPatientCared = ListPatientsCared(Patients, true);
  const PatientsNotTreated = ListPatientsCared(Patients, false);

 // const Listar_Pacientes_Mayor_Riesgo = '';
 // const Listar_Pacientes_Fumadores_Urgentes = '';
 // const Consulta_mas_Pacientes_Atendidos = '';
 // const Atender_Paciente ='';
 // const listPatient = Patients.sort((a, b) => (a.PatientPriority > b.PatientPriority ? -1 : 1));
  

  return (
    <div className="ListBoxMain">
      <ListPatient listPatient={PatientsNotTreated}/>
      <ListPatientsCaredfor ListPatientCared={ListPatientCared} />
    </div>
  );
};
