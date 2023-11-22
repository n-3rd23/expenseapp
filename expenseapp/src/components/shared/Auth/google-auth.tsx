import GoogleImg from "@/assets/google.png";
import { Button } from "@nextui-org/react";

function GoogleAuth() {
  const handleGoogleAuthentication = () => {
    window.location.replace(import.meta.env.VITE_GOOGLE_AUTH_URL);
  };

  return (
    <div>
      <Button
        className="bg-white border"
        size="lg"
        onClick={handleGoogleAuthentication}
      >
        <img src={GoogleImg} alt="google" />
      </Button>
    </div>
  );
}

export default GoogleAuth;
