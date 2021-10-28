import React from 'react';
import { Table } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { deletePatients } from '../Redux/Actions/actionPatients';

export const ListarPatients = () => {
    const dispatch = useDispatch();
    const { Patients } = useSelector(store => store.Patients);
    console.log('Buvle',Patients);

    return (
        <div>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>Documento</th>
                        <th>Nombres</th>
                        <th>Apellidos</th>
                        <th>Telefono</th>
                        <th>Celular</th>
                        <th>Dirección</th>
                        <th>Correo</th>
                        <th>Imagen</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        (Patients) ?
                            (

                                Patients.map((element, index) => (

                                    <tr key={index}>
                                        <td>{element.doc}</td>
                                        <td>{element.nom}</td>
                                        <td>{element.apell}</td>
                                        <td>{element.tel}</td>
                                        <td>{element.cel}</td>
                                        <td>{element.dir}</td>
                                        <td>{element.correo}</td>
                                        <td><img src={element.img} alt="" width="50px" /></td>

                                        <td>
                                            <button
                                       onClick={() => dispatch(deletePatients(element.correo))}>Eliminar</button>
                                        </td>

                                    </tr>
                                )
                                )

                            ) :
                            <p>Datos no disponibles</p>
                    }
                </tbody>
            </Table>
        </div>
    )
}
