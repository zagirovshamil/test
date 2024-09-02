import axios from "axios";
import { BASE_URL } from "./api.consts";

export const getPersonInfo = async (id: string) => {
  const response = await axios.get(`${BASE_URL}/user/${id}/transactions`);
  return response.data;
};
