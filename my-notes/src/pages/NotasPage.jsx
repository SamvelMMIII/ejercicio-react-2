import { useEffect, useState } from "react";
import NotaList from "../components/NotaList";
import notasAPI from "../api/notasAPI";
import NotaForm from "../components/NotaForm";
import { Notyf } from 'notyf';

const notyf = new Notyf({ duration: 3000, position: { x: 'right', y: 'top' } });

function NotasPage() {
    const [notasList, setNotasList] = useState([]);
    const [cargando, setCargando] = useState(false);

    const [notaAEditar, setNotaAEditar] = useState(null);

    const fetchNotas = async () => {
        try {
            setCargando(true);
            const response = await notasAPI.get("notas/");
            setNotasList(response.data);
        } catch (error) {
            console.log(error);
            notyf.error("Error al cargar las notas");
        } finally {
            setCargando(false);
        }
    }

    const addNota = async (nota) => {
        try {
            console.log("recibiendo nota:", nota);
            const response = await notasAPI.post("notas/", nota);
            console.log(response);
            fetchNotas();
            notyf.success("Nota creada exitosamente");
        } catch (error) {
            console.log(error);
            notyf.error("Error al crear la nota");
        }
    }

    const editNote = async (id, notaActualizada) => {
            try {
                await notasAPI.put(`notas/${id}/`, notaActualizada);
                notyf.success("Nota editada correctamente");
                setNotaAEditar(null); 
                fetchNotas();
            } catch (error) {
                console.log(error);
                notyf.error("Error al editar la nota");
            }
    }

    const updateCompleted = async (id, completed) => {
        try {
            await notasAPI.patch(`notas/${id}/`, { completed });
            notyf.success("Nota actualizada");
            fetchNotas();
        } catch (error) {
            console.log(error)
            notyf.error("Error al actualizar la nota");
        }
    }

    const deleteNote = async (id) => {
        try {
            const response = await notasAPI.delete(`notas/${id}/`);
            notyf.success("Nota eliminada");
            fetchNotas();
        } catch (error) {
            console.log(error);
            notyf.error("Error al eliminar la nota");
        }
    }

    useEffect(() => {
        fetchNotas();
    }, []);

    return (
        <div className="notas-page-container">
            <h1>My Notes</h1>
            <NotaForm 
                registrarNota={addNota} 
                notaAEditar={notaAEditar} 
                editarNota={editNote} 
                setNotaAEditar={setNotaAEditar}
            />
            
            { cargando ? (
                <p>Cargando notas...</p>
            ) : (
                <NotaList listado={notasList} onCompleted={updateCompleted} onDeleted={deleteNote} onEdit={setNotaAEditar} 
                />
            )}
        </div>
    )
}

export default NotasPage;