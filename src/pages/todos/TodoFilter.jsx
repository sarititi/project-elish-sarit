import { AuthContext } from "../AuthContext.jsx";
import {useContext } from "react";

function TodoFilter({ setSortBy }) {
    const { user, setUser } = useContext(AuthContext);

  return (
    <select onChange={e => setSortBy(e.target.value)}>
      <option value="id">מזהה</option>
      <option value="title">כותרת</option>
      <option value="completed">בוצע</option>
    </select>
  );
}

export default TodoFilter;
