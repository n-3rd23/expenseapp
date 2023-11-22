import { Button, Card, Progress } from "@nextui-org/react";
import FlowerImg from "@/assets/flower.png";
import BoxImg from "@/assets/box.png";

function Sidebar() {
  return (
    <div className="bg-gray-400 h-full w-full lg:w-[300px] py-10 px-5">
      <h1 className="text-center font-semibold text-xl text-typography-400">
        Where your money go?
      </h1>
      <div className="max-w-[350px] mx-auto lg:w-full">
        <div>
          <div className="mt-10">
            <div className="flex justify-between text-sm font-medium">
              <span>Food and drinks</span>
              <span>123.44</span>
            </div>
            <Progress
              aria-label="food-drinks"
              value={60}
              className="max-w-md mt-2"
              color="success"
              classNames={{
                base: "h-2",
              }}
            />
          </div>
          <div className="mt-10">
            <div className="flex justify-between text-sm font-medium">
              <span>Food and drinks</span>
              <span>123.44</span>
            </div>
            <Progress
              aria-label="food-drinks"
              value={60}
              className="max-w-md mt-2"
              classNames={{
                base: "h-2",
              }}
              color="success"
            />
          </div>
          <div className="mt-10">
            <div className="flex justify-between text-sm font-medium">
              <span>Food and drinks</span>
              <span>123.44</span>
            </div>
            <Progress
              aria-label="food-drinks"
              value={60}
              className="max-w-md mt-2"
              color="success"
              classNames={{
                base: "h-2",
              }}
            />
          </div>
          <div className="mt-10">
            <div className="flex justify-between text-sm font-medium">
              <span>Food and drinks</span>
              <span>123.44</span>
            </div>
            <Progress
              aria-label="food-drinks"
              value={60}
              className="max-w-md mt-2"
              color="success"
              classNames={{
                base: "h-2",
              }}
            />
          </div>
        </div>
        <div className="mt-40">
          <Card className="p-4 shadow-none bg-gray relative overflow-visible">
            <img
              src={BoxImg}
              alt="box"
              className="h-[80px] w-[80px] absolute -top-4"
            />
            <img
              src={FlowerImg}
              alt="flower"
              className="h-[100px] w-[70px] absolute -top-10 right-5"
            />
            <div className="mt-28">
              <h4 className="font-semibold text-[16px] text-center">
                Save more money
              </h4>
              <div className="text-gray-500 text-sm">
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim.
              </div>
            </div>
            <Button color="secondary" className="mt-5">
              VIEW TIPS
            </Button>
          </Card>
        </div>
      </div>
    </div>
  );
}

export default Sidebar;
