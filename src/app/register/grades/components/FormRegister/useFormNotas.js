import { api } from "@/lib/api";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup";
import { schemaNota } from "@/validation/validationNota";

export const useHookFormNotas = () =>{
    const [tags, setTags] = useState([])
    const [selectedTags, setSelectedTags] = useState([])
    
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

    return {
        errors,
        register,
        handleSubmit,
        register,
        handleTagClick,
        onSubmit,
        tags,
        selectedTags
    }
}