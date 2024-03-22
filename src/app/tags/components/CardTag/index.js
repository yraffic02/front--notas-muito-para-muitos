
import { Button, TypeButton } from "@/components/Button"
import { FormEditeTag } from "./components/FormEditeTag"

export const CardTag = ({tag, handleEdit, handleDelete}) =>{
    return(
        <>
            <div className="card mb-3">
                <div className="card-body">
                    <h5 className="card-title">{tag.titulo}</h5>
                    {
                        tag.Notas?.length > 0 ?
                        <div className="mb-2">
                        {tag.Notas.map((nota) => (
                            <span key={nota.id} className="badge bg-primary me-1">
                                {nota.titulo}
                            </span>
                        ))}
                        </div>
                        : <p>Não notas para esta tag!</p>
                    }
                    <Button
                        onClick={() => handleEdit(tag)}
                        className="btn btn-primary me-2"
                        typeButton={TypeButton.PRIMARY}
                        data-bs-toggle="modal" data-bs-target="#exampleModal"
                    >
                        Editar
                    </Button>
                    <Button
                        onClick={() => handleDelete(tag.id)}
                        typeButton={TypeButton.SECONDARY}
                        
                    >
                        Excluir
                    </Button>
                </div>
            </div>
            <div className="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div className="modal-dialog">
                        <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="exampleModalLabel">Editar Nota</h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                           <FormEditeTag />
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}