function NotaItem({ nota, onCompleted, onDeleted }) {
    const { id, title, description, completed } = nota;
    return (
        <div className={`nota ${completed ? 'nota-tachada' : ''}`}>
            <h3>{title}</h3><button onClick={() => onDeleted(id)}>X</button>
            <p>{description}</p>
            <button onClick={() => onCompleted(id, !completed)}>{!completed ? "Completar" : "Pendiente"}</button>
        </div>
    )
}

export default NotaItem;