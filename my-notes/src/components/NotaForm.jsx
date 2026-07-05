import { use, useState } from "react";

function NotaForm({ registrarNota }) {
    const [nombre, setNombre] = useState("");
    const [descripcion, setDescripcion] = useState("");
    const [mensajeError, setMensajeError] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(nombre, descripcion);

        // validaciones pendientes
        if (nombre.trim() === "") {
            setMensajeError("Nombre no puede estar vacio")
            setTimeout(() => {
                setMensajeError("");
            }, 3000);
            return
        }

        if (descripcion.trim() === "") {
            setMensajeError("Descripcion no puede estar vacio")
            setTimeout(() => {
                setMensajeError("");
            }, 3000);
            return
        }

        const nota = {
            title: nombre,
            description: descripcion
        }

        setNombre("");
        setDescripcion("");

        registrarNota(nota);
    }

    return (
        <form onSubmit={e => handleSubmit(e)}>
            <input onChange={e => setNombre(e.target.value)} value={nombre} type="text" placeholder="Ingrese titulo..." />
            <input onChange={e => setDescripcion(e.target.value)} value={descripcion} type="text" placeholder="Ingrese descripcion..." />
            <button type="submit">Agregar</button>
            <p>{mensajeError}</p>
        </form>
    )
}

export default NotaForm;