import { Alert } from "@/components/Alert";
import { useEffect, useState } from "react";

const UserDetails = () => {
  const url = import.meta.env.VITE_API_URL + "/user";
  const token = localStorage.getItem("token");
  const [user, setUser] = useState({});
  const [alertOpen, setAlertOpen] = useState(false);
  const [alertTxt, setAlertTxt] = useState("");

  if (!token) {
    window.location.reload(false);
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
  }, [token, url]); // Add dependencies here

  return (
    <>
      <Alert
        isOpen={alertOpen}
        onChange={() => setAlertOpen(false)}
        text={alertTxt}
      />
      <div className="w-full p-4 flex justify-start gap-12 bg-slate-100 rounded-md shadow-lg">
        <div className="flex flex-col p-7">
          <p className="text-5xl font-bold">{user.fullname}</p>
          <p className="text-slate-400 py-2">@{user.username}</p>
        </div>
        <div className="flex-col gap-4 text-2xl font-light p-7">
          <p>Bought Insurances : {user.insurancesBought}</p>
          <p className="py-4">Claimend Insurances : {user.insurancesClaimed}</p>
        </div>
      </div>
    </>
  );
};

export default UserDetails;
