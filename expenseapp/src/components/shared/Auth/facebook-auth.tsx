import { Button } from "@nextui-org/react";
import FacebookImg from "@/assets/facebook.png";

function FacebookAuth() {
  return (
    <div>
      <Button className="bg-blue-300 border" size="lg">
        <img src={FacebookImg} alt="google" />
      </Button>
    </div>
  );
}

export default FacebookAuth;
