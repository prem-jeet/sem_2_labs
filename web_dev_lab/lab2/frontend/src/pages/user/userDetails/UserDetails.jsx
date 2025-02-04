import { Alert } from "@/components/Alert";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const UserDetails = () => {
  const url = import.meta.env.VITE_API_URL + "/user";
  const token = localStorage.getItem("token");
  const [user, setUser] = useState({});
  const [alertOpen, setAlertOpen] = useState(false);
  const [alertTxt, setAlertTxt] = useState("");

  const navigate = useNavigate();
  if (!token) {
    navigate("/auth/login");
  }

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const req = await fetch(url, {
          method: "POST",
          headers: {
            Authorization: token,
          },
        });
        const res = await req.json();
        if (res.success) {
          setUser(res.data);
        } else {
          setAlertTxt(res.message);
          setAlertOpen(true);
        }
        // eslint-disable-next-line no-unused-vars
      } catch (error) {
        setAlertTxt("Network error. Please try again.");
        setAlertOpen(true);
      }
    };

    fetchUser();
  }, [navigate, token, url]); // Add dependencies here

  return (
    <>
      <Alert
        isOpen={alertOpen}
        onChange={() => setAlertOpen(false)}
        text={alertTxt}
      />
      <div>{JSON.stringify(user, null, 2)}</div>
    </>
  );
};

export default UserDetails;
