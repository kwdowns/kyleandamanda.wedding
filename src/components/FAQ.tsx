import React from "react";
import * as faqData from "@/data/faq";

type Faq = {
  question: string;
  answer?: string;
};

export default function FaqSection() {
  const faqs = faqData.faqs;
  return (
    <div className="w-4/5 md:w-3/4 lg:1/2 mx-auto">
      {faqs.map((faq, index) => (
        <FaqItem
          key={`faq_${index}`}
          question={faq.question}
          answer={faq.answer}
        />
      ))}
    </div>
  );
}

interface IFaqItemProps extends Faq {}

function FaqItem({ question, answer }: IFaqItemProps) {
  if (answer) {
    return (
      <div className="my-4 p-2 border-b text-pretty bg-accent rounded-lg drop-shadow-md">
        <h4 className="text-xl font-bold text-left">{question}</h4>
        <p className="text-md text-left pt-4">{answer}</p>
      </div>
    );
  }
}
