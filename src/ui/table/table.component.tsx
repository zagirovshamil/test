import { FC, useEffect, useState } from "react";
import axios from "axios";
import { Users } from "./users";

type PostResponce = {
  data: Post[];
  pages: number;
};

interface Post {
  id: string;
  email: string;
  tg_id: string | null;
  name: string;
  password: string | null;
  avatar: string | null;
  created_at: string;
  role: string;
  subscription: Subscription;
}

interface Subscription {
  id: string;
  plan_id: string;
  user_id: string;
  tokens: number;
  additional_tokens: number;
  created_at: string;
  plan: Plan;
}

interface Plan {
  id: string;
  type: string;
  price: number;
  currency: string;
  tokens: number;
}

type TableProps = {
  searchQuery: string;
};

const BASE_URL = "https://test.gefara.xyz/api/v1//user";
const SECOND_URL = `${BASE_URL}/list`;

export const Table: FC<TableProps> = ({ searchQuery }) => {
  const [posts, setPosts] = useState<Post[]>([]);

  // page: number; ?page=${page}
  const getPostsUrl = () => {
    return `${SECOND_URL}`;
  };

  const getSearchUrl = (search: string) => {
    return `${SECOND_URL}?search=${search}`;
  };

  useEffect(() => {
    const getPosts = async () => {
      try {
        // const res = await axios.get<PostResponce>(`${SECOND_URL}`); Тут просто получение списка, а ниже получение ограниченого списка
        const res = await axios.get<PostResponce>(`${getPostsUrl()}`);

        const fetchedPosts = res.data.data;
        if (searchQuery) {
          const res = await axios.get<PostResponce>(
            `${getSearchUrl(searchQuery)}`
          );
          const filteredPosts = res.data.data;

          setPosts(filteredPosts);
        } else {
          setPosts(fetchedPosts);
        }
      } catch (error) {
        console.log("error", error);
      }
    };

    getPosts();
  }, [searchQuery]);

  return (
    <>
      <Users URL={BASE_URL} dataList={posts} />
    </>
  );
};
