import { FC, useState } from "react";
import { Search, Users } from "../../ui";
import "./homepage.scss";

export const Homepage: FC = () => {
  const [searchQuery, setSearchQuery] = useState<string>("");

  const handleSearch = (query: string): void => {
    setSearchQuery(query);
  };

  return (
    <>
      <div className="container">
        <h1 className="container__title">Моя организация</h1>
        <hr />
        <h1 className="container__main">Пользователи</h1>
        <Search onSearch={handleSearch} placeholder="Поиск..." />
        <Users searchQuery={searchQuery} />
      </div>
    </>
  );
};
