import { useSearchParams } from "react-router-dom";
import "./search.scss";

export const Search = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const postQuery = searchParams.get("post") || "";

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.target;
    const query = form.search.value;

    const params = {};
    setSearchParams({ post: query });
  };

  return (
    <div>
      <form autoComplete="off" onSubmit={handleSubmit}>
        <input
          type="search"
          style={{ color: "white", margin: "10px" }}
          name="search"
        />
        <input type="submit" style={{ color: "white" }} value="Search" />
      </form>
    </div>
  );
};
