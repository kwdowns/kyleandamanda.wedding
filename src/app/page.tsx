import Image from "next/image";
import caligraphy from '../../public/kyle-and-amanda.svg'


export default function Home(){
  return (
    <div className="text-center p-8 container mx-auto">
      <Image 
        src={caligraphy}
        alt="Kyle and Amanda"
        className="mt-4 "
      />
      <p className="mt-4 text-2xl text-gray-600">June 14, 2025</p>
      <p className="mt-2 text-2xl text-gray-600">Kansas City, Missouri</p>
    </div>
  );
}
