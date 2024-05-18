import Image from 'next/image'
import { Gallery } from "next-gallery"

const images = [
    { src: "/img/proposal_1.jpeg", aspect_ratio: 3/4 },
    { src: "/img/proposal_2.jpeg", aspect_ratio: 3/4 },
    { src: "/img/proposal_2.jpeg", aspect_ratio: 3/4 },
    { src: "/img/proposal_2.jpeg", aspect_ratio: 3/4 },
    { src: "/img/proposal_2.jpeg", aspect_ratio: 3/4 },
    { src: "/img/proposal_2.jpeg", aspect_ratio: 3/4 },
    { src: "/img/proposal_2.jpeg", aspect_ratio: 3/4 },
    { src: "/img/proposal_2.jpeg", aspect_ratio: 3/4 },
    { src: "/img/proposal_2.jpeg", aspect_ratio: 3/4 },
    { src: "/img/proposal_2.jpeg", aspect_ratio: 3/4 },
    { src: "/img/proposal_2.jpeg", aspect_ratio: 3/4 },
    { src: "/img/proposal_2.jpeg", aspect_ratio: 3/4 },
    { src: "/img/proposal_2.jpeg", aspect_ratio: 3/4 },
    { src: "/img/proposal_2.jpeg", aspect_ratio: 3/4 },
    { src: "/img/proposal_2.jpeg", aspect_ratio: 3/4 },
    { src: "/img/proposal_2.jpeg", aspect_ratio: 3/4 },
    { src: "/img/proposal_2.jpeg", aspect_ratio: 3/4 },
    { src: "/img/proposal_2.jpeg", aspect_ratio: 3/4 },
    { src: "/img/proposal_2.jpeg", aspect_ratio: 3/4 },
    { src: "/img/proposal_2.jpeg", aspect_ratio: 3/4 },
    { src: "/img/proposal_2.jpeg", aspect_ratio: 3/4 },
    { src: "/img/proposal_2.jpeg", aspect_ratio: 3/4 },
    { src: "/img/proposal_2.jpeg", aspect_ratio: 3/4 },
    { src: "/img/proposal_2.jpeg", aspect_ratio: 3/4 },
    { src: "/img/proposal_2.jpeg", aspect_ratio: 3/4 },
    { src: "/img/proposal_2.jpeg", aspect_ratio: 3/4 },
    { src: "/img/proposal_2.jpeg", aspect_ratio: 3/4 },
    { src: "/img/proposal_2.jpeg", aspect_ratio: 3/4 },
    { src: "/img/proposal_2.jpeg", aspect_ratio: 3/4 },
    { src: "/img/proposal_2.jpeg", aspect_ratio: 3/4 },
    { src: "/img/proposal_2.jpeg", aspect_ratio: 3/4 },
    { src: "/img/proposal_2.jpeg", aspect_ratio: 3/4 },
    { src: "/img/proposal_2.jpeg", aspect_ratio: 3/4 },
    { src: "/img/proposal_2.jpeg", aspect_ratio: 3/4 },
    { src: "/img/proposal_2.jpeg", aspect_ratio: 3/4 },
    { src: "/img/proposal_2.jpeg", aspect_ratio: 3/4 },
    { src: "/img/proposal_2.jpeg", aspect_ratio: 3/4 },
    { src: "/img/proposal_2.jpeg", aspect_ratio: 3/4 },
    { src: "/img/proposal_2.jpeg", aspect_ratio: 3/4 },
    { src: "/img/proposal_2.jpeg", aspect_ratio: 3/4 },
    { src: "/img/proposal_2.jpeg", aspect_ratio: 3/4 },
    { src: "/img/proposal_2.jpeg", aspect_ratio: 3/4 },
    { src: "/img/proposal_2.jpeg", aspect_ratio: 3/4 },
    { src: "/img/proposal_2.jpeg", aspect_ratio: 3/4 },
    { src: "/img/proposal_2.jpeg", aspect_ratio: 3/4 },
    { src: "/img/proposal_2.jpeg", aspect_ratio: 3/4 },
    { src: "/img/proposal_2.jpeg", aspect_ratio: 3/4 },
]

const widths = [ 500, 800, 1200, 1600 ]
const ratios = [ 1.5, 2, 4, 4, 3]

export default function Page(){
    return(
        <Gallery 
            widths={widths}
            images={images}
            ratios={ratios}
            gap={'0.5rem'}
        />
    )
}