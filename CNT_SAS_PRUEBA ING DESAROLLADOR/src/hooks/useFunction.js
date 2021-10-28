import { useState, useEffect } from "react";

export const ActionButton = () => {
  const [activeStep, setActiveStep] = useState(0);

  const handleNext = () => {
    setActiveStep(activeStep + 1);
  };

  const handleBack = () => {
    setActiveStep(activeStep - 1);
  };

  return { handleNext, handleBack, activeStep };
};

export const StepTitle = (step = "title", step2 = "title", step3 = "title") => {
  const steps = [step, step2, step3];
  return { steps };
};

export const StepContent = () => {
  const getStepContent = (step, Page1, Page2, Page3) => {
    switch (step) {
      case 0:
        return Page1;
      case 1:
        return Page2;
      case 2:
        return Page3;
      default:
        throw new Error("Unknown step");
    }
  };

  return { getStepContent };
};

export const IMC = (weight, height) => {
  const imc = weight / Math.pow(height, 2);

  //Para los niños:
  const priority = (Age, Weight, Height) => {
    console.log(Age, Weight, Height);
    if (Age < 6) {
      return Height / Weight + 3;
    } else if (parseInt(Age) <= 12) {
      return Height / Weight + 2;
    } else if (parseInt(Age) <= 15) {
      return Height / Weight + 1;
    }
  };
  //Jóvenes:
  const priorityYoung = (Smoker, Years) => {
    if (Smoker === true) {
      console.log((Years / 4 )+ 2);
      return ((Years / 4 )+ 2);
    } else {
      return 2;
    }
  };

  //Adultos:
  const priorityAdult = (diet, age) => {
    if (diet === true) {
      return parseInt(age / 20 + 4);
    } else {
      return parseInt(age / 30 + 3);
    }
  };

  //Riesgo:
  const risk = (Age, Priority) => {
    if (Age <= 40) {
      return (Age * Priority) / 100;
    } else {
      return (Age * Priority) / 100 + 5.3;
    }
  };

  //Peso ideal:
  const NutritionalAssessment = () => {
    if (imc < 18.5) {
      return "Bajo peso";
    } else if (imc >= 18.5 && imc <= 24.9) {
      return "Normal";
    } else if (imc >= 25 && imc <= 29.9) {
      return "Sobrepeso";
    } else if (imc >= 30 && imc <= 34.9) {
      return "Obesidad grado 1";
    } else if (imc >= 35 && imc <= 39.9) {
      return "Obesidad grado 2";
    } else if (imc >= 40) {
      return "Obesidad grado 3";
    } else {
      return "Error";
    }
  };

  return {
    imc,
    priority,
    priorityYoung,
    priorityAdult,
    risk,
    NutritionalAssessment,
  };
};

//Funciones extras
export const ExtraFeatures = (Age, priorida) => {
  const getMaxRisk = (array) => {
    let NewArray = [];
    for (let i = 0; i < array.length; i++) {
      if (array[i].Risk > 4) {
        NewArray.push(array[i]);
      }
    }
    return NewArray;
  };

  //Pediactrics
  const pediatrics = (Array, age, priority) => {
    let NewArray = [];
    for (let i = 0; i < Array.length; i++) {
      if (Array[i].PatientPriority <= priority && Array[i].age <= age) {
        NewArray.push(Array[i]);
      }
    }
    return NewArray;
  };

  //INTEGRAL MEDICINE
  const IntegralMedicine = (Array, age, priority) => {
    let NewArray = [];
    for (let i = 0; i < Array.length; i++) {
      if (Array[i].PatientPriority <= priority && Array[i].age >= age) {
        NewArray.push(Array[i]);
      }
    }
    return NewArray;
  };

  //Pacientes atendididos
  const ListPatientsCared = (Array, sel) => {
    let NewArray = [];
    if (sel) {
      for (let i = 0; i < Array.length; i++) {
        if (Array[i].attended === true) {
          NewArray.push(Array[i]);
        }
      }
    } else if (sel === false) {
      for (let i = 0; i < Array.length; i++) {
        if (Array[i].attended === false) {
          NewArray.push(Array[i]);
        }
      }
    }
    return NewArray;
  };

  //Buscar
  const PatientsFind = (Array, firstname, lastname, num) => {
    let NewArray = {
      age: "",
      lastName: "",
      firstName: "",
      Smoke: "",
      SmokingYears: "",
      Diet: "",
      DietType: "",
      medicalHistory: "",
      Query: "",
      Height: "",
      Weight: "",
      IMC: "",
      nutritionalAssessment: "",
      PatientPriority: "",
      Risk: "",
      professional: "",
    };
    for (let i = 0; i < Array.length; i++) {
      if (
        Array[i].firstName === firstname &&
        Array[i].lastName === lastname &&
        Array[i].medicalHistory === num
      ) {
        NewArray.age = Array[i].age;
        NewArray.lastName = Array[i].lastName;
        NewArray.firstName = Array[i].firstName;
        NewArray.Smoke = Array[i].Smoke;
        NewArray.SmokingYears = Array[i].SmokingYears;
        NewArray.Diet = Array[i].Diet;
        NewArray.DietType = Array[i].DietType;
        NewArray.medicalHistory = Array[i].medicalHistory;
        NewArray.Query = Array[i].Query;
        NewArray.Height = Array[i].Height;
        NewArray.Weight = Array[i].Weight;
        NewArray.IMC = Array[i].IMC;
        NewArray.nutritionalAssessment = Array[i].nutritionalAssessment;
        NewArray.PatientPriority = Array[i].PatientPriority;
        NewArray.Risk = Array[i].Risk;
        NewArray.professional = Array[i].professional;
      }
    }
    return NewArray;
  };

  return {
    getMaxRisk,
    pediatrics,
    IntegralMedicine,
    PatientsFind,
    ListPatientsCared,
  };
};
