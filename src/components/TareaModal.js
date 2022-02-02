import { useState } from "react"
import { Card, Modal } from "react-bootstrap"

const TareaModal = ({mostrar, cerrar, banderaFuncion,bandera}) => {

    const [ tarea, setTarea ] = useState({
        titulo: "",
        descripcion: "",
        materia: "",
        fechaEntrega: ""
    })

    const handleChange = (e) => {
        setTarea({
            ...tarea,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = () => {
        fetch("/createTarea" , {
            method: "POST",
            mode: "cors",
            headers: {
                "Content-Type": "application/x-www-form-urlencoded"
            },
            body: new URLSearchParams({
                titulo: tarea.titulo,
                descripcion: tarea.descripcion,
                materia: tarea.materia,
                fechaEntrega: tarea.fechaEntrega
            })
        }).then(response => response.json())
          .then(data => {
              bandera ? banderaFuncion(false) : banderaFuncion(true)
              cerrar()
              setTarea({
                titulo: "",
                descripcion: "",
                materia: "",
                fechaEntrega: ""
              })
          })
    }

    return(
        <Modal show={mostrar} onHide={cerrar}>
            <Modal.Header>
                <h5 className="text-center">Crear Tarea Nueva</h5>
            </Modal.Header>
            <Modal.Body>
                <div className="mb-3">
                    <label className="form-label">Titulo</label>
                    <input type="text" className="form-control" name="titulo" placeholder="Titulo" value={tarea.titulo} onChange={handleChange} />
                </div>
                <div className="mb-3">
                    <label className="form-label">Descripcion</label>
                    <textarea className="form-control" placeholder="Descripcion" name="descripcion" value={tarea.descripcion} onChange={handleChange}></textarea>
                </div>
                <div className="mb-3">
                    <label className="form-label">Materia</label>
                    <select className="form-control" name="materia" value={tarea.materia} onChange={handleChange}>
                        <option value="" disabled>Selecciona la materia</option>
                        <option value="ecuaciones">Ecuaciones diferenciales</option>
                        <option value="estadistica">Estadistica</option>
                        <option value="procesos estocasticos">Procesos estocasticos</option>
                        <option value="metodos numericos">Metodos numericos</option>
                        <option value="optimizacion">Optimizacion 2</option>
                    </select>
                </div>
                <div className="mb-3">
                    <label className="form-label">Fecha de entrega</label>
                    <input type="date" className="form-control"  name="fechaEntrega" value={tarea.fechaEntrega} onChange={handleChange}/>
                </div>
                
            </Modal.Body>
            <Modal.Footer>
                <button className="btn btn-primary" onClick={handleSubmit}>Crear Tarea</button>
            </Modal.Footer>
        </Modal>
    )

}

export default TareaModal