import NotaItem from "./NotaItem.jsx";
import "./NotaList.css";

function NotaList({ listado, onCompleted, onDeleted, onEdit }) {
    return (
        <div className="contenedor">
            {
                listado.length === 0 ? <p>No hay notas</p> :
                    listado.map(n => (
                        <NotaItem 
                            nota={n} 
                            key={n.id} 
                            onCompleted={onCompleted} 
                            onDeleted={onDeleted} 
                            onEdit={onEdit} 
                        />
                    ))
            }
        </div>
    )
}

export default NotaList;