const yup = require('yup')

export const schemaNota = yup.object({
    titulo: yup.string().required("O título é obrigatório"),
    conteudo: yup.string().required("O conteúdo é obrigatório"),
    tags: yup.array().of(yup.number())
});