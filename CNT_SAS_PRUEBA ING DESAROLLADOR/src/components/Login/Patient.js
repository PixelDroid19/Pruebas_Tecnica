import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { logout } from "../../Redux/Actions/actionLogin";
import { useForm } from "../../hooks/useForm";
import { fileUpload } from "../../helpers/FileUpload";
import { lisPatients, registerPatients } from "../../Redux/Actions/actionPatients";
import { ListarPatients } from "../ListarPatients";

export const Patients = ({ history }) => {
  const dispatch = useDispatch();

  const [values, handleInputChange, reset] = useForm({
    documento: "",
    nombres: "",
    apellidos: "",
    telefono: "",
    celular: "",
    direccion: "",
    correo: "",
    imagen: "",
  });

  let {
    documento,
    nombres,
    apellidos,
    telefono,
    celular,
    direccion,
    correo,
    imagen,
  } = values;

  const handleRegistro = (e) => {
    e.preventDefault();
    dispatch(
      registerPatients(
        documento,
        nombres,
        apellidos,
        telefono,
        celular,
        direccion,
        correo,
        imagen
      )
    );
    reset();
  };

  const handleLogout = () => {
    dispatch(logout());
    history.replace("/login");
  };

  const handlePictureClick = () => {
    document.querySelector("#fileSelector").click();
  };

  const handleFileChanged = (e) => {
    const file = e.target.files[0];
    fileUpload(file)
      .then((response) => {
        imagen = response;
        console.log(response);
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

  useEffect(() => {
    dispatch(lisPatients());
  }, [dispatch]);

  return (
    <div>
      <form onSubmit={handleRegistro}>
        <h1>Pacientes</h1>
        <div className="form-group">
          <div className="form-group col-md-4">
            <label htmlFor="documento">Documento</label>
            <input
              className="form-control"
              type="text"
              name="documento"
              id="documento"
              value={documento}
              onChange={handleInputChange}
            />
          </div>

          <div className="form-group col-md-4">
            <label htmlFor="nombres">Nombres</label>
            <input
              className="form-control"
              type="text"
              name="nombres"
              id="nombres"
              value={nombres}
              onChange={handleInputChange}
            />
          </div>

          <div className="form-group col-md-4">
            <label htmlFor="apellidos">Apellidos</label>
            <input
              className="form-control"
              type="text"
              name="apellidos"
              id="apellidos"
              value={apellidos}
              onChange={handleInputChange}
            />
          </div>

          <div className="form-group col-md-4">
            <label htmlFor="telefono">Teléfono</label>
            <input
              className="form-control"
              type="text"
              name="telefono"
              id="telefono"
              value={telefono}
              onChange={handleInputChange}
            />
          </div>

          <div className="form-group col-md-4">
            <label htmlFor="celular">Celular</label>
            <input
              className="form-control"
              type="text"
              name="celular"
              id="celular"
              value={celular}
              onChange={handleInputChange}
            />
          </div>

          <div className="form-group col-md-4">
            <label htmlFor="direccion">Dirección</label>
            <input
              className="form-control"
              type="text"
              name="direccion"
              id="direccion"
              value={direccion}
              onChange={handleInputChange}
            />
          </div>

          <div className="form-group col-md-4">
            <label htmlFor="celular">Correo</label>
            <input
              className="form-control"
              type="text"
              name="correo"
              id="correo"
              value={correo}
              onChange={handleInputChange}
            />
          </div>

          <br />
          <div className="form-group col-md-4">
            <input
              id="fileSelector"
              type="file"
              name="file"
              style={{ display: "none" }}
              onChange={handleFileChanged}
            />

            <button
              className="btn btn-success"
              onClick={handlePictureClick}
              type="button"
            >
              Imagen
            </button>
          </div>

          <div>
            <button className="btn btn-primary" type="submit">
              Guardar
            </button>
          </div>

          <div>
            <button
              className="btn btn-primary"
              type="button"
              onClick={handleLogout}
            >
              Logout
            </button>
          </div>
        </div>
      </form>
      <ListarPatients />
    </div>
  );
};
