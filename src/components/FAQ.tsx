import React from "react";

interface IFaqSectionProps{
    faqs: Faq[];
}

type Faq = {
    question: string;
    answer?: string;
}

export default function FaqSection({faqs}:IFaqSectionProps){
    return(
        <div className="w-4/5 md:w-3/4 mx-auto">
            {faqs.map((faq, index) => (
                <FaqItem 
                    key={`faq_${index}`} 
                    question={faq.question} 
                    answer={faq.answer} 
                />
            ))}
        </div>
    )
}

interface IFaqItemProps extends Faq{}

function FaqItem({question,answer}:IFaqItemProps){
    if(answer){
        return(
            <div className="py-2 border-b">
                <h4 className="text-xl font-bold text-left">{question}</h4>
                <p className="text-left">{answer}</p>
            </div>
        )
    }
}
