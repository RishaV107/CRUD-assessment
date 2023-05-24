import { useState } from "react";
// import { useNavigate } from "react-router-dom";

const Form = () => {
  //   const navigate = useNavigate();
  const [studentName, setStudentName] = useState("");
  const [className, setClassName] = useState("");
  const [rollNumber, setRollNumber] = useState(0);
  const [section, setSection] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = {
      studentName,
      className,
      rollNumber,
      section,
    };

    await fetch("http://localhost:3030/api/student", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });

    setStudentName("");
    setClassName("");
    setRollNumber(0);
    setSection("");
    window.location.reload();
  };

  return (
    <>
      <form className="form-container" onSubmit={handleSubmit}>
        <div>
          <label htmlFor="studentName" style={{ paddingRight: "20px" }}>
            Name
          </label>
          <input
            type="text"
            name="studentName"
            id="studentName"
            value={studentName}
            onChange={(e) => setStudentName(e.target.value)}
          />
        </div>

        <div>
          <label htmlFor="className" style={{ paddingRight: "10px" }}>
            Class Name
          </label>
          <input
            type="text"
            name="className"
            id="className"
            value={className}
            onChange={(e) => setClassName(e.target.value)}
          />
        </div>

        <div>
          <label htmlFor="rollNumber" style={{ paddingRight: "10px" }}>
            Roll Number
          </label>
          <input
            type="number"
            name="rollNumber"
            id="rollNumber"
            value={rollNumber}
            onChange={(e) => setRollNumber(e.target.value)}
          />
        </div>

        <div>
          <label htmlFor="section" style={{ paddingRight: "10px" }}>
            Section
          </label>
          <input
            type="text"
            name="section"
            id="section"
            value={section}
            onChange={(e) => setSection(e.target.value)}
          />
        </div>

        <div>
          <input type="submit" value="Add" />
        </div>
      </form>
    </>
  );
};

export default Form;
