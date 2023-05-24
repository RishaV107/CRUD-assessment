import { useEffect, useState } from "react";

/* eslint-disable react/prop-types */
const StudentList = ({ list, flip }) => {
  const [data, setData] = useState([]);

  useEffect(() => {
    setData(list);
  }, [list]);

  useEffect(() => {
    console.log("###", data);
  }, [data, flip]);

  const handleDelete = async (id) => {
    await fetch(`http://localhost:3030/api/student/${id}`, {
      method: "DELETE",
    });
    window.location.reload();
  };

  return (
    <>
      {data.length ? (
        <>
          {data.map((obj) => (
            <div key={obj.id}>
              <div className="student-list">
                <h3>Name: {obj.studentName}</h3>
                <h3>Class: {obj.className}</h3>
                <h3>Roll No. : {obj.rollNumber}</h3>
                <h3>Section : {obj.section}</h3>

                <div>
                  <button onClick={() => handleEdit(obj.id)}>Edit</button>
                  <button onClick={() => handleDelete(obj.id)}>Delete</button>
                </div>
              </div>
              <div className="divider"></div>
            </div>
          ))}
        </>
      ) : (
        <>
          <h1>Database Empty</h1>
        </>
      )}
    </>
  );
};

export default StudentList;
