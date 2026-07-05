import { use, useEffect, useState } from "react";
import NotaList from "../components/NotaList";
import notasAPI from "../api/notasAPI";
import NotaForm from "../components/NotaForm";
import { Notyf } from 'notyf';

function NotasPage() {
    const [notasList, setNotasList] = useState([]);
    const [cargando, setCargando] = useState(false);

    const fetchNotas = async () => {
        try {
            setCargando(true);
            const response = await notasAPI.get("notas/");
            setNotasList(response.data);
        } catch (error) {
            console.log(error);
        } finally {
            setCargando(false);
        }
    }

    const addNota = async (nota) => {
        try {
            const notyf = new Notyf();
            console.log("recibiendo nota:", nota);
            const response = await notasAPI.post("notas/", nota);
            console.log(response);
            fetchNotas();
            notyf.success("Nota creada exitosamente");
        } catch (error) {
            console.log(error);
        }
    }

    const updateCompleted = async (id, completed) => {
        try {
            const notyf = new Notyf();
            await notasAPI.patch(`notas/${id}/`, { completed });
            notyf.success("Nota actualizada");
            fetchNotas();
        } catch (error) {
            console.log(error)
        }
    }

    const deleteNote = async (id) => {
        try {
            const notyf = new Notyf();
            const reponse = await notasAPI.delete(`notas/${id}/`);
            notyf.success("Nota eliminada");
            fetchNotas();
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        fetchNotas();
    }, []);

    return (
        <>
            <h1>My Notes</h1>
            <NotaForm registrarNota={addNota} />
            {
                cargando ?
                    <p>Cargando notas...</p>
                    :
                    <NotaList listado={notasList} onCompleted={updateCompleted} onDeleted={deleteNote} />
            }
        </>
    )
}

export default NotasPage;       