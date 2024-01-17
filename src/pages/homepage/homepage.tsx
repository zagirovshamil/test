import { FC } from "react";
import { Search, Table } from "../../ui";

export const Homepage: FC = () => {
  return (
    <>
      <div className="container">
        <h1>Моя организация</h1>
        <hr />
        <div>Пользователи</div>
        <Search />
        <Table />
      </div>
    </>
  );
};
