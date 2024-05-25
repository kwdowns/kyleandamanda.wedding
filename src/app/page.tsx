import Image from "next/image";
import caligraphy from "../../public/kyle-and-amanda.svg";
import proposal_1 from '../../public/home_image.png';


export default function Home() {
  return (
    <div className="text-center p-8 container mx-auto w-auto">
        <Image 
          src={caligraphy} 
          alt="Kyle and Amanda" 
          className="-mb-36" 
        />
        <Image
          src={proposal_1}
          alt=""
          className=""
        />       
      <div>
        <p className="mt-4 text-2xl text-gray-600">We're getting Married!</p>
        <p className="mt-4 text-xl text-gray-600">June 14, 2025</p>
        <p className="mt-2 text-xl text-gray-600">Kansas City, Missouri</p>
      </div>
      
    </div>
  );
}

