import * as Yup from "yup";

// INITIAL VALUES FINANCIAL PRODUCT

export const initialFinancialProductsValues = {
  id: "",
  name: "",
  description: "",
  logo: "https://www.visa.com.ec/dam/VCOM/regional/lac/SPA/Default/Pay%20With%20Visa/Tarjetas/visa-signature-400x225.jpg",
  date_release: "",
  date_revision: ""
};


// ADD FINANCIAL PRODUCT SCHEMA
export const addFinancialProductSchema = Yup.object().shape({

  id: Yup.string()
    .required("ID no valido")
    .min(3, "Ingresa al menos 3 caracteres y máximo 10")
    .max(10, "Máximo 10 caracteres")
    .matches(/^[a-zA-Z0-9]+$/, "Solo se permiten letras y números"),

  name: Yup.string()
    .required("Este campo es requerido")
    .min(5, "Ingresa al menos 5 caracteres y máximo 100")
    .max(100, "Máximo 100 caracteres"),

  description: Yup.string()
    .required("Este campo es requerido")
    .min(10, "Ingresa al menos 10 caracteres y máximo 200")
    .max(200, "Máximo 100 caracteres"),

  logo: Yup.string()
    .required("Este campo es requerido"),

  date_release: Yup.string().required("Este campo es requerido"),

  date_revision: Yup.string()
});
