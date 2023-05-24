import { useEffect, useState } from "react";
import "./App.css";
import Form from "./components/Form";
import StudentList from "./components/StudentList";

function App() {
  const [data, setData] = useState([]);

  const loadData = async () => {
    const fetchData = await fetch("http://localhost:3030/api/student");

    const { data: parsedData } = await fetchData.json();

    setData(parsedData);
  };

  useEffect(() => {
    loadData();
  }, []);

  useEffect(() => {
    console.log(data);
  }, [data]);

  return (
    <>
      <div className="container">
        <div className="header">
          <h1>Student List</h1>
        </div>
        <div className="divider"></div>

        <Form />

        <div className="divider"></div>

        <StudentList list={data} />
      </div>
    </>
  );
}

export default App;
