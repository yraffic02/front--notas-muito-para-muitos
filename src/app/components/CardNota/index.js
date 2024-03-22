
import { Button, TypeButton } from "@/components/Button"

export const CardNota = ({nota, handleEdit, handleDelete}) =>{
    return(
        <>
            <div className="card mb-3">
                <div className="card-body">
                    <h5 className="card-title">{nota.titulo}</h5>
                    <p className="card-text">{nota.conteudo}</p>
                    {
                        nota.Tags?.length > 0 ?
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
                    >
                        Editar
                    </Button>
                    <Button
                        typeButton={TypeButton.SECONDARY}
                        data-bs-toggle="modal" data-bs-target="#exampleModal"
                    >
                        Excluir
                    </Button>
                </div>
            </div>
            <div className="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div className="modal-dialog">
                        <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="exampleModalLabel">Nota</h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                          <p>Deseja excluir está nota?</p>
                        </div>
                        <div className="modal-footer">
                            <Button 
                                type="button"  
                                data-bs-dismiss="modal"
                                typeButton={TypeButton.SECONDARY}
                                onClick={() => handleDelete(nota.id)}
                            >
                                CONFIRMAR
                            </Button>
                            <Button 
                                type="button"  
                                data-bs-dismiss="modal"
                                typeButton={TypeButton.PRIMARY}
                            >
                                CANCELAR
                            </Button>
                        </div>
                    </div>
                </div>
            </div> 
        </>
    )
}