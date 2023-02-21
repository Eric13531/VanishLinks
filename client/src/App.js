import logo from "./logo.svg";
import "./App.css";
import axios from "axios";

function App() {
  const handleSubmit = async (e) => {
    e.preventDefault();

    const response = await axios.post("http://localhost:5000/upload", {
      url: e.target.url.value,
    });
    console.log(e.target.url.value);
  };
  return (
    <div className="App">
      <form onSubmit={handleSubmit}>
        <label>
          URL: <input type="text" name="url"></input>
        </label>
        <input type="submit" value="Submit" />
      </form>
    </div>
  );
}

export default App;
