import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "./ui/button";
import { ShoppingCart } from "lucide-react";
const BuyInsuranceCard = ({
  cardTitle,
  cardDescription,
  onBuy,
  disableButton,
}) => {
  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle>{cardTitle}</CardTitle>
          <CardDescription>{cardDescription}</CardDescription>
        </CardHeader>

        <CardFooter>
          <Button onClick={onBuy} disabled={disableButton}>
            <ShoppingCart />
            Buy
          </Button>
        </CardFooter>
      </Card>
    </>
  );
};

export default BuyInsuranceCard;
