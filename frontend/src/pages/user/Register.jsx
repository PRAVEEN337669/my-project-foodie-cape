import { useState } from "react";

function Register() {

  // ✅ Live Backend URL
  const backendURL = "https://foodie-cape.onrender.com";

  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch(`${backendURL}/api/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(user)
      });

      const data = await res.json();
      alert(data.message || "Registered Successfully!");

    } catch (err) {
      console.log(err);
      alert("Server Error");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input name="name" value={user.name} onChange={handleChange} placeholder="Name" />
      <input name="email" value={user.email} onChange={handleChange} placeholder="Email" />
      <input name="password" value={user.password} onChange={handleChange} placeholder="Password" />
      <button type="submit">Register</button>
    </form>
  );
}

export default Register;