import { Card } from "react-bootstrap";

const TareaComponente = ({objeto,banderaFuncion,bandera}) => {

    const handleupdateStatus = () => {
        fetch("/updateTarea/" + objeto.idtarea , {
            method: "PUT",
            mode: "cors",
            headers: {
                "Content-Type": "application/x-www-form-urlencoded"
            },
            body: new URLSearchParams({
                titulo: objeto.titulo,
                descripcion: objeto.descripcion,
                materia: objeto.materia,
                fechaEntrega: objeto.fechaEntrega,
            })
        }).then(response => response.json())
          .then(data => {
            bandera ? banderaFuncion(false) : banderaFuncion(true)
        })
    }

    return(
        <>
            <Card>
                <Card.Header>
                    <div className="d-flex justify-content-between">
                        <h5>{objeto .titulo}</h5>
                        <i class="far fa-check-circle" onClick={handleupdateStatus}></i>                        
                    </div>
                </Card.Header>
                <Card.Body>
                    <p>{objeto.descripcion}</p>
                    <p>{objeto.materia}</p>
                    <p>Fecha de entrega: {objeto.fechaEntrega}</p>
                </Card.Body>
            </Card>
        </>
    )

}

export default TareaComponente;