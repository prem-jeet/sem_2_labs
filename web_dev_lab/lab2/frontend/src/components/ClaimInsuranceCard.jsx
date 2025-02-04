import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "./ui/button";
import { Check, Hand } from "lucide-react";
const ClaimInsuranceCard = ({
  cardTitle,
  cardDescription,
  onClaim,
  disableButton,
  isClaimed,
}) => {


  return (
    <>
      <Card className={`${isClaimed && "bg-teal-200"}`}>
        <CardHeader>
          <CardTitle>{cardTitle}</CardTitle>
          <CardDescription>{cardDescription}</CardDescription>
        </CardHeader>

        <CardFooter>
          {isClaimed ? (
            <Button className="bg-green-900 text-green-400" disabled>
              <Check />
              Claimed
            </Button>
          ) : (
            <Button onClick={onClaim} disabled={disableButton}>
              <Hand /> Claim
            </Button>
          )}
        </CardFooter>
      </Card>
    </>
  );
};

export default ClaimInsuranceCard;
