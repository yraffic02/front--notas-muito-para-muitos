const yup = require('yup')

export const schemaTag = yup.object({
    titulo: yup.string().required("O título é obrigatório"),
    notas: yup.array().of(yup.number())
});