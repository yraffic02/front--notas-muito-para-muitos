import { Button, TypeButton } from "../Button"
import { FormEditeNota } from "./components/FormEditeNota"

export const Card = ({nota, handleEdit, handleDelete}) =>{
    return(
        <>
            <div className="card mb-3">
                <div className="card-body">
                    <h5 className="card-title">{nota.titulo}</h5>
                    <p className="card-text">{nota.conteudo}</p>
                    {
                        nota.Tags.length > 0 ?
                        <div className="mb-2">
                        {nota.Tags.map((tag) => (
                            <span key={tag.id} className="badge bg-primary me-1">
                            {tag.titulo}
                            </span>
                        ))}
                        </div>
                        : <p>Não tags para esta nota!</p>
                    }
                    <Button
                        onClick={() => handleEdit(nota)}
                        className="btn btn-primary me-2"
                        typeButton={TypeButton.PRIMARY}
                        data-bs-toggle="modal" data-bs-target="#exampleModal"
                    >
                        Editar
                    </Button>
                    <Button
                        onClick={() => handleDelete(nota.id)}
                        typeButton={TypeButton.SECONDARY}
                        
                    >
                        Excluir
                    </Button>
                </div>
            </div>
            <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div class="modal-dialog">
                        <div class="modal-content">
                        <div class="modal-header">
                            <h1 class="modal-title fs-5" id="exampleModalLabel">Editar Nota</h1>
                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div class="modal-body">
                           <FormEditeNota />
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}