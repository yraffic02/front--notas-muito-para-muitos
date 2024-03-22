import { Button, TypeButton } from "../Button"

export const Card = ({nota, handleEdit, handleDelete}) =>{
    return(
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
                    onClick={() => handleEdit(nota.id)}
                    className="btn btn-primary me-2"
                    typeButton={TypeButton.PRIMARY}
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
    )
}