"use client"
import { Button, TypeButton } from "@/components/Button";
import { api } from "@/lib/api";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';

export const FormEditeNota = () => {
  const [tags, setTags] = useState([])
  const [selectedTags, setSelectedTags] = useState([])
  const nota = useSelector((state)=>  state.notaReducer.value)
  const [titulo, setTitulo] = useState('')
  const [conteudo, setConteudo] = useState('')
  const router = useRouter()
  
  const resolveData = async () => {
      try {
        const updateNota = {
            titulo: titulo,
            conteudo: conteudo,
            tags: selectedTags.map((tag) => tag.id)
        }

        const res = await api.patch(`/notas/${nota.id}`, updateNota)

        return res
      } catch (error) {
        console.log(error);
      }
  }
  
  const getTags = async () => {
    try {
      const { data } = await api.get('/tags');

      setTags(data);

      const selectedTagsFromNota = nota.Tags.map(notaTag => notaTag.id);

      const filteredTags = data.filter(tag => selectedTagsFromNota.includes(tag.id));
    
      setSelectedTags(filteredTags);
    } catch (error) {
      console.log(error);
    }
  }
  
  useEffect(() => {
      getTags();
      
      setSelectedTags([...selectedTags, nota.Tags])
      setTitulo(nota.titulo)
      setConteudo(nota.conteudo)
  }, [nota])
    
  const handleSubmit = async () => {
    try {
      const res = await toast.promise(
        resolveData(),
          {
            pending: "Aguarde!",
            success: "Nota Criada",
            error: "Algo deu errado!",
          },
          {
            position: "top-center",
            autoClose: 900,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          },
      );
        
      
      return router.back()
    } catch (error) {
      console.error(error);
    }
  }

  const handleTagClick = (tag) => {
    const isSelected = selectedTags.includes(tag);

    if (isSelected) {
      setSelectedTags(selectedTags.filter((selectedTag) => selectedTag !== tag));
    } else {
      setSelectedTags([...selectedTags, tag]);
    }
  }

  return(
      <>
          <form className="row g-3 needs-validation" onSubmit={handleSubmit}>
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
                      defaultValue={titulo}
                      onChange={(e)=> setTitulo(e.target.value)}                    
                    />
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
                      defaultValue={conteudo}
                      onChange={(e)=> setConteudo(e.target.value)}
                    />
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
                      Atualizar nota
                  </Button>
              </div>
          </form> 
      </>
  )
}