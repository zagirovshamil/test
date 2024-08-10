import { FC, SyntheticEvent } from "react";
import "./search.scss";

type SearchProps = {
  onSearch: (query: string) => void;
  placeholder: string;
};

export const Search: FC<SearchProps> = ({ onSearch, placeholder }) => {
  const handleChange = (event: SyntheticEvent<HTMLInputElement>) => {
    // event.preventDefault();
    const value = event.currentTarget.value.trim();

    onSearch(value);
  };

  return (
    <div className="search__wrapper">
      <input
        className="search__wrapper--main"
        type="search"
        placeholder={placeholder}
        name="search"
        onChange={handleChange}
      />
    </div>
  );
};
