import React from "react";
import * as faqData from "@/data/faq";

type Faq = {
  question: string;
  answer?: string;
};

export default function FaqSection() {
  const faqs = faqData.faqs;
  return (
    <ul>
      {faqs.map((faq, index) => (
        <FaqItem
          key={`faq_${index}`}
          question={faq.question}
          answer={faq.answer}
        />
      ))}
    </ul>
  );
}

interface IFaqItemProps extends Faq {}

function FaqItem({ question, answer }: IFaqItemProps) {
  if (answer) {
    return (
      <li >
        <div className="my-4 p-2 border-2 border-tertiary-light text-pretty bg-accent rounded-lg drop-shadow-xl">
          <h4 className="text-xl font-bold text-left">{question}</h4>
          <p className="text-md text-left pt-4">{answer}</p>
        </div>
      </li>
    );
  }
}
