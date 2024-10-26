export interface FaqItemProps {
  title: string;
  answer?: string;
  children?: React.ReactNode;
}

export default function FaqItem({ title, answer, children }: FaqItemProps) {
  return (
    <li className="my-4 p-2 border-2 border-tertiary-light text-pretty bg-accent rounded-lg drop-shadow-xl">
      <h4 className="text-xl font-bold text-left">{title}</h4>
      <div className="text-md text-left pt-4">
        {answer && <p>{answer}</p>}
        {children}
      </div>
    </li>
  );
}
