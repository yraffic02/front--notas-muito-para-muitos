"use client"
import { Button, TypeButton } from "@/components/Button";
import { useHookFormNotas } from "./useFormNotas";

export const FormRegister = () => {
  const {
    errors,
    handleSubmit,
    handleTagClick,
    onSubmit,
    register,
    selectedTags,
    tags
  } = useHookFormNotas()
  
  return(
      <>
          <h1 className="fs-4 text-center ">Registre sua Nota</h1>
          <form className="row g-3 needs-validation" onSubmit={handleSubmit(onSubmit)}>
              <div className="col-md-4">
                  <label 
                    htmlFor="titulo" 
                    className="form-label"
                  >
                    Título
                  </label>
                  <div className="d-flex-column">
                    <input 
                      type="text" 
                      className="form-control" 
                      id="titulo" 
                      {...register("titulo")}
                    />
                    <p 
                      className="fs-6 text-danger"
                    >
                      {errors.titulo?.message}
                    </p>
                  </div>
              </div>
              <div className="col-md-4">
                  <label 
                    htmlFor="conteudo" 
                    className="form-label"
                  >
                    Conteúdo
                  </label>
                  <div  className="d-flex-column">
                    <input 
                      type="text" 
                      className="form-control" 
                      id="conteudo"
                      {...register("conteudo")}
                    />
                    <p className="fs-6 text-danger">
                      {errors.conteudo?.message}
                    </p>
                  </div>
              </div>
              <div className="col-md-3">
                  <label className="form-label">
                      Tags
                  </label>
                  <div 
                    className="d-flex flex-wrap" 
                    style={{
                      height: '5rem',
                      width: '100%',
                      overflow: 'auto'
                    }}
                  >
                    {tags.map((tag) => (
                      <div
                        key={tag.id}
                        className={`btn ${selectedTags.includes(tag) ? 'btn-primary' : 'btn-outline-primary'} me-2 mb-2`}
                        onClick={() => handleTagClick(tag)}
                      >
                        {tag.titulo}
                      </div>
                    ))}
                  </div>
              </div>

              <div className="col-12">
                  <Button 
                      typeButton={TypeButton.PRIMARY} 
                      type="submit"
                  >
                      Criar nota
                  </Button>
              </div>
          </form> 
      </>
  )
}