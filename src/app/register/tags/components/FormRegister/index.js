"use client"
import { Button, TypeButton } from "@/components/Button";
import { api } from "@/lib/api";
import { schemaTag } from "@/validation/validationTag";
import { yupResolver } from "@hookform/resolvers/yup";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from 'react-toastify';

export const FormRegisterTag = () => {
  const [notas, setNotas] = useState([])
  const [selectedNotas, setSelectedNotas] = useState([])
  
  const {
      register,
      handleSubmit,
      formState: { errors },
      reset,
      } = useForm({
      mode: "all",
      reValidateMode: "onChange",
      resolver: yupResolver(schemaTag),
      });

  const resolveData = async (data) => {
      try {
      const tag = {
          ...data,
          tags: selectedNotas.map((nota) => nota.id)
      }

      const res = await api.post('/tags', tag)

      if(res.status  === 201){
          return res
      }
      } catch (error) {
      console.log(error);
      }
  }

  const getNotas = async () => {
      try {
          const { data } = await api.get('/notas');
      
          setNotas(data);
      } catch (error) {
          console.log(error);
      }
  };

  useEffect(() => {
      getNotas();
  }, [])

  const onSubmit = async (data) => {
      try {
      const res = await toast.promise(
          resolveData(data),
          {
          pending: "Aguarde!",
          success: "Nota Tag",
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

  const handleNotasClick = (nota) => {
      const isSelected = selectedNotas.includes(nota);

      if (isSelected) {
          setSelectedNotas(selectedNotas.filter((selectedNota) => selectedNota !== nota));
      } else {
          setSelectedNotas([...selectedNotas, nota]);
      }
  }
  
  return(
      <>
          <h1 className="fs-4 text-center ">Registre sua Tag</h1>
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
              <div className="col-md-3">
                  <label className="form-label">
                      Notas
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
                        style={{
                          height: "2.5rem"
                        }}
                        onClick={() => handleNotasClick(nota)}
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
                      Criar nota
                  </Button>
              </div>
          </form> 
      </>
  )
}