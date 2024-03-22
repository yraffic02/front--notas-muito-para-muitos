"use client"
import { api } from "@/lib/api"
import { useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup";
import { Button, TypeButton } from "@/components/Button";
import { schemaNota } from "@/validation/validationNota";
import { toast } from 'react-toastify';
import {useSelector} from 'react-redux'

export const FormEditeNota = () => {
  const [tags, setTags] = useState([])
  const [selectedTags, setSelectedTags] = useState([])
  const nota = useSelector((state)=>  state.notaReducer.value)
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    mode: "all",
    reValidateMode: "onChange",
    resolver: yupResolver(schemaNota),
  });
  

  const resolveData = async (data) => {
      try {
      const nota = {
          ...data,
          tags: selectedTags.map((tag) => tag.id)
      }

      const res = await api.post('/notas', nota)

      if(res.status  === 201){
          return res
      }
      } catch (error) {
      console.log(error);
      }
  }
  
  const getTags = async () => {
      try {
          const { data } = await api.get('/tags');
          
          setTags(data);
          
          const selectedTagsFromNota = nota.Tags.map(notaTag => notaTag.id);
          console.log(selectedTagsFromNota)
          const filteredTags = data.filter(tag => selectedTagsFromNota.includes(tag.id));
          console.log(filteredTags)
          
          setSelectedTags(filteredTags)
      } catch (error) {
          console.log(error);
      }
  }
  
    useEffect(() => {
        getTags();
    }, [])
    
    const onSubmit = async (data) => {
        try {
        const res = await toast.promise(
            resolveData(data),
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

        if (res) {
            reset();
        }
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
                      defaultValue={nota.titulo}
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
                      defaultValue={nota.conteudo}
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
                      data-bs-dismiss="modal"
                  >
                      Criar nota
                  </Button>
              </div>
          </form> 
      </>
  )
}