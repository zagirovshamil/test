export type UserProps = {
  dataList: Post[];
  pages: number;
};

export type Props = {
  searchQuery: string;
};

export type Post = {
  id: string | number;
  email: string;
  tg_id: string | null;
  name: string;
  password: string | null;
  avatar: string | null;
  created_at: string;
  role: string;
  subscription: Subscription;
  tgId: null;
};

export type Subscription = {
  id: string | number;
  plan_id: string;
  user_id: string;
  tokens: number;
  additional_tokens: number;
  created_at: string;
  plan: Plan;
};

export type Plan = {
  id: string | number;
  type: string;
  price: number;
  currency: string;
  tokens: number;
};

// export type tableHeadModels = {
//   data
// }

export type Order = "tokens%3Aasc" | "tokens%3Adesc";
