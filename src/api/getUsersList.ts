// TODO: добавить сюда query запросы из react-query
import axios from "axios";
import { BASE_URL } from "./api.consts";

export const getUsersList = async (
  page: number,
  search: string,
  orderBy: string
) => {
  const response = await axios.get(
    `${BASE_URL}/user/list?page=${page}&search=${search}&orderBy=${orderBy}`
  );
  return response.data;
};
