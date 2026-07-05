function NotaItem({ nota, onCompleted, onDeleted, onEdit }) {
    const { id, title, description, completed } = nota;
    return (
        <div className={`nota ${completed ? 'nota-tachada' : ''}`}>
            <div className="nota-header">
                <h3>{title}</h3>
                <button className="btn-delete" onClick={() => onDeleted(id)}>X</button>
            </div>
            <p className="nota-desc">{description}</p>
            <div className="nota-actions">
                <button className="btn-action" onClick={() => onCompleted(id, !completed)}>
                    {!completed ? "Completar" : "Pendiente"}
                </button>
                <button className="btn-action btn-edit" onClick={() => onEdit(nota)}>
                    Editar
                </button>
            </div>
        </div>
    )
}

export default NotaItem;