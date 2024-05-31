import Image from "next/image";
import caligraphy from "../../public/kyle-and-amanda.svg";
import proposal_1 from "../../public/home_image.png";


export default function Home() {
  return (
    <div className="text-center w-full">
      <div className="w-3/4 md:w-1/2 max-h-3/4 mx-auto">
        <Image 
            src={caligraphy} 
            alt="Kyle and Amanda" 
            className="-mb-36 object-cover" 
          />
        <Image
          src={proposal_1}
          alt=""
          className=""
        />  
      </div> 
      <div>
        <p className="mt-4 text-2xl">We&apos;re getting Married!</p>
        <p className="mt-4 text-xl">June 14, 2025</p>
        <p className="mt-2 text-xl">Kansas City, Missouri</p>
        <p>{getDaysUntilWedding()} days until the big day!</p>
      </div>
    </div>
  );
}

const weddingDate = new Date("2025-06-14T20:00:00Z");

function getDaysUntilWedding() {
  const today = new Date();
  const diffTime = weddingDate.getTime() - today.getTime();
  return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
}