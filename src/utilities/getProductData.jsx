import api from "../api";

export const getProductData = async (id) => {
  return await api.get(`/api/products/${id}`).then((res) => {
    return res.data;
  }).catch((err) => console.log(err));
};
