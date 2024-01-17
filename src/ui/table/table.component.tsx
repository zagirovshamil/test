import axios from "axios";

const FIRST_API_URL = "https://jsonplaceholder.typicode.com/posts";

export const Table = () => {
  const getPosts = async () => {
    try {
      const res = await axios({
        url: `${FIRST_API_URL}`,
        method: "GET",
        params: { offset: 0, limit: 10 },
      });
    } catch (error) {
      console.log("error", error);
    }
  };

  console.log("getposts", getPosts());

  return <></>;
};
