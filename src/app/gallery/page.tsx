import { promises as fs } from 'fs'
import path from 'path'
import React from 'react';
import Image from 'next/image'

const widths = [ 500, 800, 1200, 1600 ]
const ratios = [ 1.5, 2, 4, 4, 3]

export default async function Gallery() {
    const imageDirectory = path.join(process.cwd(), '/public/gallery');
    const imageFiles = await fs.readdir(imageDirectory);
    console.log(imageFiles);
    return (
        <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {imageFiles.map(
                (el: string) => 
                <div className='relative w-full h-96' key={el}>
                    <Image 
                        className="transfrom rounded-lg shadow-lg" 
                        fill={true}
                        alt={''} 
                        src={`/gallery/${el}`}
                        key={el}
                    />
                </div>
            )}
        </div>
    );
}

