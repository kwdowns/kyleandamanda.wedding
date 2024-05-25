import { promises as fs } from "fs";
import path from "path";
import React from "react";
import Image from "next/image";

// Image imports - Start
// import proposal1 from "../../../public/gallery/proposal_1.jpg";
// import proposal2 from "../../../public/gallery/proposal_2.jpg";
import california from '../../../public/gallery/california.jpg'
import chiefs_game_1 from '../../../public/gallery/chiefs_game_1.jpg'
import christmas1_2023 from '../../../public/gallery/christmas1_2023.jpg'
import christmas2_2023 from '../../../public/gallery/christmas2_2023.jpg'
import christmas3_2023 from '../../../public/gallery/christmas3_2023.jpg'
import christmas4_2023 from '../../../public/gallery/christmas4_2023.jpg'
import christmas_party1_2020 from '../../../public/gallery/christmas_party1_2020.jpg'
import christmas_party2_2020 from '../../../public/gallery/christmas_party2_2020.jpg'
import christmas_party3_2020 from '../../../public/gallery/christmas_party3_2020.jpg'
import disney_1 from '../../../public/gallery/disney_1.jpg'
import july4th_2023 from '../../../public/gallery/july4th_2023.jpg'
import kyle_fall_2023 from '../../../public/gallery/kyle_fall_2023.jpg'
import matt_gandy_wedding from '../../../public/gallery/matt_gandy_wedding.jpg'
import proposal_1 from '../../../public/gallery/proposal_1.jpg'
import proposal_2 from '../../../public/gallery/proposal_2.jpg'
import proposal_3 from '../../../public/gallery/proposal_3.jpg'
import proposal_4 from '../../../public/gallery/proposal_4.jpg'
import proposal_5 from '../../../public/gallery/proposal_5.jpg'
import proposal_6 from '../../../public/gallery/proposal_6.jpg'
import zion_hike_1 from '../../../public/gallery/zion_hike_1.jpg'
import zion_hike_2 from '../../../public/gallery/zion_hike_2.jpg'
import zion_hike_3 from '../../../public/gallery/zion_hike_3.jpg'
// Image imports - End

export default function Gallery() {
  return (
    <div className="mt-8 flex xs:flex-col flex-wrap gap-2 ml-2 mr-2">
      {/* Image components - Start */}
      <Image
        src={california}
        alt=""
        className="flex-auto w-1/2 sm:w-1/3 md:w-1/4 lg:w-1/5 xl:w-1/6"
      />
   <Image
        src={chiefs_game_1}
        alt=""
        className="flex-auto w-1/2 sm:w-1/3 md:w-1/4 lg:w-1/5 xl:w-1/6"
      />
   <Image
        src={christmas1_2023}
        alt=""
        className="flex-auto w-1/2 sm:w-1/3 md:w-1/4 lg:w-1/5 xl:w-1/6"
      />
   <Image
        src={christmas2_2023}
        alt=""
        className="flex-auto w-1/2 sm:w-1/3 md:w-1/4 lg:w-1/5 xl:w-1/6"
      />
   <Image
        src={christmas3_2023}
        alt=""
        className="flex-auto w-1/2 sm:w-1/3 md:w-1/4 lg:w-1/5 xl:w-1/6"
      />
   <Image
        src={christmas4_2023}
        alt=""
        className="flex-auto w-1/2 sm:w-1/3 md:w-1/4 lg:w-1/5 xl:w-1/6"
      />
   <Image
        src={christmas_party1_2020}
        alt=""
        className="flex-auto w-1/2 sm:w-1/3 md:w-1/4 lg:w-1/5 xl:w-1/6"
      />
   <Image
        src={christmas_party2_2020}
        alt=""
        className="flex-auto w-1/2 sm:w-1/3 md:w-1/4 lg:w-1/5 xl:w-1/6"
      />
   <Image
        src={christmas_party3_2020}
        alt=""
        className="flex-auto w-1/2 sm:w-1/3 md:w-1/4 lg:w-1/5 xl:w-1/6"
      />
   <Image
        src={disney_1}
        alt=""
        className="flex-auto w-1/2 sm:w-1/3 md:w-1/4 lg:w-1/5 xl:w-1/6"
      />
   <Image
        src={july4th_2023}
        alt=""
        className="flex-auto w-1/2 sm:w-1/3 md:w-1/4 lg:w-1/5 xl:w-1/6"
      />
   <Image
        src={kyle_fall_2023}
        alt=""
        className="flex-auto w-1/2 sm:w-1/3 md:w-1/4 lg:w-1/5 xl:w-1/6"
      />
   <Image
        src={matt_gandy_wedding}
        alt=""
        className="flex-auto w-1/2 sm:w-1/3 md:w-1/4 lg:w-1/5 xl:w-1/6"
      />
   <Image
        src={proposal_1}
        alt=""
        className="flex-auto w-1/2 sm:w-1/3 md:w-1/4 lg:w-1/5 xl:w-1/6"
      />
   <Image
        src={proposal_2}
        alt=""
        className="flex-auto w-1/2 sm:w-1/3 md:w-1/4 lg:w-1/5 xl:w-1/6"
      />
   <Image
        src={proposal_3}
        alt=""
        className="flex-auto w-1/2 sm:w-1/3 md:w-1/4 lg:w-1/5 xl:w-1/6"
      />
   <Image
        src={proposal_4}
        alt=""
        className="flex-auto w-1/2 sm:w-1/3 md:w-1/4 lg:w-1/5 xl:w-1/6"
      />
   <Image
        src={proposal_5}
        alt=""
        className="flex-auto w-1/2 sm:w-1/3 md:w-1/4 lg:w-1/5 xl:w-1/6"
      />
   <Image
        src={proposal_6}
        alt=""
        className="flex-auto w-1/2 sm:w-1/3 md:w-1/4 lg:w-1/5 xl:w-1/6"
      />
   <Image
        src={zion_hike_1}
        alt=""
        className="flex-auto w-1/2 sm:w-1/3 md:w-1/4 lg:w-1/5 xl:w-1/6"
      />
   <Image
        src={zion_hike_2}
        alt=""
        className="flex-auto w-1/2 sm:w-1/3 md:w-1/4 lg:w-1/5 xl:w-1/6"
      />
   <Image
        src={zion_hike_3}
        alt=""
        className="flex-auto w-1/2 sm:w-1/3 md:w-1/4 lg:w-1/5 xl:w-1/6"
      />

      {/* Image components - End */}
    </div>
  );
}

