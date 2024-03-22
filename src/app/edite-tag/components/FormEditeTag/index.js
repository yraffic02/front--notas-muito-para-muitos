"use client"
import { Button, TypeButton } from "@/components/Button";
import { api } from "@/lib/api";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';

export const FormEditeTag = () => {
  const [notas, setNotas] = useState([])
  const [selectedNotas, setSelectedNotas] = useState([])
  const [titulo, setTitulo] = useState('')
  const tag = useSelector((state)=>  state.tagReducer.value)
  const router = useRouter()

  const resolveData = async (data) => {
      try {
        const updateTag = {
            titulo: titulo,
            conteudo: conteudo,
            tags: selectedNotas.map((nota) => nota.id)
        }

        const res = await api.patch(`/tag/${tag.id}`, updateTag)

        return res
      } catch (error) {
        console.log(error);
      }
  }
  
  const getNotas = async () => {
    try {
      const { data } = await api.get('/notas');

      setNotas(data);

      const selectedNotasFromTag = notas.Tags.map(notaTag => notaTag.id);

      const filteredNotas = data.filter(nota => selectedNotasFromTag.includes(nota.id));
    
      setSelectedNotas(filteredNotas);
    } catch (error) {
      console.log(error);
    }
  }
  
  useEffect(() => {
      getNotas();
      
      setSelectedNotas([...selectedNotas, notas.Tags]) 
      setTitulo(tag.titulo)
  }, [tag])
    
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

      if(res){
        router.push('/tags')
      }
    } catch (error) {
      console.error(error);
    }
  }

  const handleNotaClick = (nota) => {
    const isSelected = selectedNotas.includes(nota);

    if (isSelected) {
      setSelectedNotas(selectedNotas.filter((selectedNota) => selectedNota !== nota));
    } else {
      setSelectedNotas([...selectedNotas, nota]);
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
                    {notas.map((nota) => (
                      <div
                        key={nota.id}
                        className={`btn ${selectedNotas.includes(nota) ? 'btn-primary' : 'btn-outline-primary'} me-2 mb-2`}
                        onClick={() => handleNotaClick(nota)}
                      >
                        {nota.titulo}
                      </div>
                    ))}
                  </div>
              </div>

              <div className="col-12">
                  <Button 
                      typeButton={TypeButton.PRIMARY} 
                      type="submit"
                  >
                      Atualizar tag
                  </Button>
              </div>
          </form> 
      </>
  )
}