
import { Button, TypeButton } from "@/components/Button"
import { FormEditeTag } from "../../../edite-tag/components/FormEditeTag"

export const CardTag = ({tag, handleEditTag, handleDeleteTag}) =>{
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
                        : <p>Não há notas para esta tag!</p>
                    }
                    <Button
                        onClick={() => handleEditTag(tag.id)}
                        className="btn btn-primary me-2"
                        typeButton={TypeButton.PRIMARY}
                    >
                        Editar
                    </Button>
                    <Button
                        typeButton={TypeButton.SECONDARY}
                        data-bs-toggle="modal" data-bs-target="#exampleModal2"
                    >
                        Excluir
                    </Button>
                </div>
            </div>
            <div className="modal fade" id="exampleModal2" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div className="modal-dialog">
                        <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="exampleModalLabel">Tag</h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                          <p>Deseja excluir está tag?</p>
                        </div>
                        <div className="modal-footer">
                            <Button 
                                type="button"  
                                data-bs-dismiss="modal"
                                typeButton={TypeButton.SECONDARY}
                                onClick={() => handleDeleteTag(tag.id)}
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