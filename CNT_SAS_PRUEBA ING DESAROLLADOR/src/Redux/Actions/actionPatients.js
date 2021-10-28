import { typesPatients } from "../types/types";
import { Export } from "../../firebase/firebaseConfig";
import {
  updateDoc,
  addDoc,
  collection,
  getDocs,
  deleteDoc,
  query,
  where,
  doc,
} from "@firebase/firestore";
const { DB } = Export();

//Subir al Store
export const PatientsFormData = (data) => {
  return (dispatch) => {
    dispatch(DatosSincrono(data));
  };
};

export const DatosSincrono = (formData) => {
  return {
    type: typesPatients.FormData,
    payload: { formData },
  };
};

//Eliminar
export const deletePatients = (correo) => {
  return async (dispatch) => {
    const estCollection = collection(DB, "Patients");
    const q = query(estCollection, where("correo", "==", correo));
    const datos = await getDocs(q);
    datos.forEach((docu) => {
      deleteDoc(doc(DB, "Patients", docu.id));
    });
    dispatch(deleteSincrono(correo));
  };
};

export const deleteSincrono = (correo) => {
  return {
    type: typesPatients.Delete,
    payload: correo,
  };
};

//Registrar
export const registerPatients = (
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
) => {
  return (dispatch) => {
    const newPatients = {
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
    };
    addDoc(collection(DB, "Patients"), newPatients)
      .then((resp) => {
        dispatch(registerPatientsSincrono(newPatients));
      })
      .catch((error) => {
        console.log(error);
      });
  };
};

export const registerPatientsSincrono = (patients) => {
  return {
    type: typesPatients.Register,
    payload: patients,
  };
};

//Lectura
export const lisPatients = () => {
  return async (dispatch) => {
    const querySnapshot = await getDocs(collection(DB, "Patients"));
    const patients = [];
    querySnapshot.forEach((doc) => {
      patients.push({
        ...doc.data(),
      });
    });
    dispatch(list(patients));
  };
};

export const list = (patients) => {
  return {
    type: typesPatients.List,
    payload: patients,
  };
};

//Editar
export const EditarData = (
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
) => {
  return async (dispatch) => {
    const estCollection = collection(DB, "Patients");
    const q = query(estCollection, where("lastName", "==", lastName));
    const querySnapshot = await getDocs(q);

    console.log(querySnapshot);
    querySnapshot.forEach(async (docu) => {
      const docRef = await doc(DB, "Patients", `${docu.id}`);
      console.log(docRef);
      const updateTimestamp = await updateDoc(docRef, {
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
      });
    });
  };
};

export const EditarSincrono = (patients) => {
  return {
    type: typesPatients.Editar,
    payload: patients,
  };
};
