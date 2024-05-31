import Image, { StaticImageData } from 'next/image'

export default function Page() {
  return <h1>The wedding of kyle and amanda</h1>;
}

interface IReviewSectionProps
{
  title: string
  image: StaticImageData
  article: string
}

function ReviewSection(props: IReviewSectionProps){
  return (
    <div>

    </div>
  )
}