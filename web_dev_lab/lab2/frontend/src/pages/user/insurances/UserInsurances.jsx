import { Alert } from "@/components/Alert";
import ClaimInsuranceCard from "@/components/ClaimInsuranceCard";
import { Button } from "@/components/ui/button";
import { logoutUser } from "@/lib/auth.util";
import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";

const UserInsurances = () => {
  const url = import.meta.env.VITE_API_URL + "/user";

  const token = localStorage.getItem("token");

  const id = localStorage.getItem("id");

  if (!(token && id)) {
    logoutUser().then((res) => {
      if (res.success) {
        setAlertText(res.message);
        setAlertOpen(true);
        setTimeout(() => {
          setAlertOpen(false);
          window.location.reload(false);
        }, 700);
      }
    });
  }

  const [alertOpen, setAlertOpen] = useState(false);
  const [alertText, setAlertText] = useState("");
  const [UserInsurances, setUserInsurances] = useState([]);
  const fetchInsurances = async () => {
    const req = await fetch(url + `/${id}`);
    const res = await req.json();
    if (res.success) {
      setUserInsurances(res.data.insurances);
    }
  };

  const claimHandler = async (insuranceId) => {
    const req = await fetch(url + `/${id}/${insuranceId}`, {
      method: "PUT",
    });
    const res = await req.json();

    if (res.success) {
      setAlertText(res.message);
      setAlertOpen(true);
      fetchInsurances();
      setTimeout(() => setAlertOpen(false), 700);
    }
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => fetchInsurances, [url]);

  return (
    <>
      <Alert
        isOpen={alertOpen}
        text={alertText}
        onChange={() => setAlertOpen(false)}
      />
      <div className="flex-col ">
        <p className="text-2xl font-bold text-cyan-950 text-center">
          My insurances
        </p>
        {UserInsurances.length ? (
          <div className="py-10 flex justify-evenly gap-5 flex-wrap">
            {UserInsurances.map((insurance) => (
              <ClaimInsuranceCard
                cardTitle={insurance.name}
                cardDescription={insurance.description}
                isClaimed={insurance.claimed}
                key={insurance.id}
                onClaim={() => claimHandler(insurance.id)}
              />
            ))}
          </div>
        ) : (
          <div className="flex-column items-center justify-center ">
            <span>
              <p className="text-xl text-center py-10 ">
                You have bought no insurances
              </p>
            </span>

            <span className="flex justify-center w-full ">
              <Button variant="ghost">
                <NavLink to="/user/buy">Buy Insurance</NavLink>
              </Button>
            </span>
          </div>
        )}
      </div>
    </>
  );
};

export default UserInsurances;
