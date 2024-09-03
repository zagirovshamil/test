export type UserProps = {
  dataList: User;
  pages: number;
};

export type Props = {
  searchQuery: string;
};

export type User = {
  id: string;
  email: string;
  tg_id: null | string;
  name: string;
  password: null | string;
  role: string;
  subscription: {
    id: string;
    plan: {
      id: string;
      type: string;
      currency: string;
      price: number;
      tokens: number;
    };
    additional_tokens: number;
    tokens: number;
    plan_id: string;
    user_id: string;
    created_at: string;
  };
  avatar: null | string;
  created_at: string;
};

export type Transaction = {
  id: string;
  provider: string;
  amount: number;
  currency: string;
  meta: null;
  created_at: string;
  external_id: null | string;
  plan_id: null | string;
  referral_id: null | string;
  status: string;
  type: string;
  user_id: string;
};

export type Order = "tokens%3Aasc" | "tokens%3Adesc";
