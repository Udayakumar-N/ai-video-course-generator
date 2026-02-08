import { Button } from "@/components/ui/button";
import { UserButton } from "@clerk/nextjs";
import Image from "next/image";

export default function Home() {
  return (
    <div>
      <h2>udaya buiiding a project</h2>
      <Button>submit</Button>
      <UserButton/>
    
    </div>
  );
}
