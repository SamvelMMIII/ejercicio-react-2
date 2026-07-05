import { useState, useEffect } from "react";
import { Notyf } from 'notyf';

function NotaForm({ registrarNota, notaAEditar, editarNota, setNotaAEditar }) {
    const [nombre, setNombre] = useState("");
    const [descripcion, setDescripcion] = useState("");
    const notyf = new Notyf();

    useEffect(() => {
        if (notaAEditar) {
            setNombre(notaAEditar.title);
            setDescripcion(notaAEditar.description);
        } else {
            setNombre("");
            setDescripcion("");
        }
    }, [notaAEditar]);

    const handleSubmit = (e) => {
        e.preventDefault();

        if (nombre.trim() === "") {
            notyf.error("El nombre no puede estar vacío");
            return;
        }

        if (descripcion.trim() === "") {
            notyf.error("La descripción no puede estar vacía");
            return;
        }

        if (notaAEditar) {
            const notaActualizada = {
                title: nombre,
                description: descripcion,
                completed: notaAEditar.completed
            };
            editarNota(notaAEditar.id, notaActualizada);
        } else {
            const nuevaNota = {
                title: nombre,
                description: descripcion,
                completed: false
            };
            registrarNota(nuevaNota);
        }

        setNombre("");
        setDescripcion("");
    }

    const cancelarEdicion = () => {
        setNotaAEditar(null);
        setNombre("");
        setDescripcion("");
    }

    return (
        <form className="nota-form" onSubmit={handleSubmit}>
            <input 
                onChange={e => setNombre(e.target.value)} 
                value={nombre} 
                type="text" 
                placeholder="Ingrese título..." 
            />
            <input 
                onChange={e => setDescripcion(e.target.value)} 
                value={descripcion} 
                type="text" 
                placeholder="Ingrese descripción..." 
            />
            <div className="form-buttons">
                <button type="submit" className="btn-submit">
                    {notaAEditar ? "Guardar Cambios" : "Agregar Nota"}
                </button>
                {notaAEditar && (
                    <button type="button" className="btn-cancel" onClick={cancelarEdicion}>
                        Cancelar
                    </button>
                )}
            </div>
        </form>
    )
}

export default NotaForm;