import { useEffect, useState } from "react";

const UserDetails = () => {
  const url = import.meta.env.VITE_API_URL + "/user";
  const token = localStorage.getItem("token");
  const [user, setUser] = useState({});

  useEffect(() => async () => {
    const req = await fetch(url, {
      method: "POST",
      headers: {
        Authorization: token, // This is required for JSON
      },
    });
    const res = await req.json();
    console.log(res);
  });

  return <div>UsereDetails</div>;
};

export default UserDetails;
