import { Button } from "@nextui-org/react";
import FacebookImg from "@/assets/facebook.png";

function FacebookAuth() {
  const handleFacebookAuthentication = () => {
    window.location.replace(import.meta.env.VITE_FACEBOOK_AUTH_URL);
  };

  return (
    <div>
      <Button
        className="bg-blue-300 border"
        size="lg"
        onClick={handleFacebookAuthentication}
      >
        <img src={FacebookImg} alt="google" />
      </Button>
    </div>
  );
}

export default FacebookAuth;
