import { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/router";

export default function ShowSchool() {
  const [schools, setSchools] = useState([]);
  const router = useRouter();

  useEffect(() => {
    axios.get("/api/getSchools")
      .then(res => setSchools(res.data))
      .catch(err => console.error(err));
  }, []);

  return (
    <div>
      <div style={{ padding: "20px" }}>
        <button onClick={() => router.push("/")}>
          ➕ Add New School
        </button>
      </div>

      <div className="grid">
        {schools.map((school) => (
          <div key={school.id} className="card">
            <img src={`/schoolImages/${school.image}`} alt={school.name} />
            <h3>{school.name}</h3>
            <p>{school.address}</p>
            <p>{school.city}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
