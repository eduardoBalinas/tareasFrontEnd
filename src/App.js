import { useEffect, useState } from "react";
import TareaComponente from "./components/TareaComponent";
import TareaModal from "./components/TareaModal";

const App = () => {

  const [show, setShow] = useState(false);
  const [ agregarTarea, setAgregarTarea ] = useState(false);
  const [ tareaPorHacer,setTareaPorHacer ] = useState([]);

  const buscarTarea = () => {

    fetch("/tareas", {method: "GET", mode: "cors"})
      .then(response => response.json())
      .then(data => {
        console.log(data.data);
        setTareaPorHacer(data.data)
      })

  }

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  useEffect(() => {
    buscarTarea()
  },[agregarTarea])


  return (
    <>
      <div className="container">
        <div className="row">
          <div className="col-md-12">
            <h1 className="text-center">Tareas pendientes</h1>
            <button className="btn btn-primary" onClick={handleShow}>Crear tarea</button>
            <TareaModal mostrar={show} cerrar={handleClose} banderaFuncion={setAgregarTarea} bandera={agregarTarea} />
          </div>
        </div>
        <div className="row">
      {
        tareaPorHacer.map(i => {
          console.log(i);
            return(
              <>
                <div className="col-3 mt-2" key={i.idtarea}>
                  <TareaComponente  objeto={i} banderaFuncion={setAgregarTarea} bandera={agregarTarea}></TareaComponente>
                </div>
              
              </>
            )
        })
      }
        </div>
      </div>
    </>
  );
}

export default App;
