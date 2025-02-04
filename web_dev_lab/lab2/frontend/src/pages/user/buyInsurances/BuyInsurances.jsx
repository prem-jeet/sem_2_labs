import { Alert } from "@/components/Alert";
import BuyInsuranceCard from "@/components/BuyInsuranceCard";
import { useEffect, useState } from "react";

const BuyInsurances = () => {
  const url = import.meta.env.VITE_API_URL;
  // const token = localStorage.getItem("token");
  const userId = localStorage.getItem("id");
  const [insurances, setInsurances] = useState([]);
  const [performingAction, setPerformingAction] = useState(false);

  const [alertOpen, setAlertOpen] = useState(false);
  const [alertText, setAlertText] = useState("");
  const buyHandler = async (insuranceId) => {
    setPerformingAction(true);

    const req = await fetch(url + `/user/${userId}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json", // This is required for JSON
      },
      body: JSON.stringify({
        selectedInsurances: [insuranceId],
      }),
    });
    const res = await req.json();

    setAlertText(res.message);
    setAlertOpen(true);
    fetchInsurances();
    setTimeout(() => {
      setPerformingAction(false);
      setAlertOpen(false);
    }, 700);
  };

  const fetchInsurances = async () => {
    const req = await fetch(url + "/insurances/available");
    const res = await req.json();
    if (res.success) {
      setInsurances(res.data.options);
    }
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => fetchInsurances, [url]);
  return (
    <>
      <Alert
        onChange={() => setAlertOpen(false)}
        text={alertText}
        isOpen={alertOpen}
      />
      <div className="flex gap-6 flex-wrap">
        {insurances.length ? (
          insurances.map((insurance) => (
            <BuyInsuranceCard
              key={insurance.id}
              cardTitle={insurance.name}
              cardDescription={insurance.description}
              onBuy={() => buyHandler(insurance.id)}
              disableButton={performingAction}
            />
          ))
        ) : (
          <p className="text-2xl text-border text-red-600">
            No more insurance to buy
          </p>
        )}
      </div>
    </>
  );
};

export default BuyInsurances;
