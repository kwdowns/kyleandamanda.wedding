import { Metadata } from "next";
import React from "react";
import * as faqData from "@/data/faq";
import MainContent from "@/components/MainContent";

export const metadata: Metadata = {
  title: "FAQ | Kyle and Amanda",
};

export default function Faq() {
  const faqs = faqData.faqs;

  return (
    <MainContent>
      <header>Frequently Asked Questions</header>
      <ul>
        {faqs.map((faq, index) => (
          <li key={`faq_item_${index}`}>
            <div className="my-4 p-2 border-2 border-tertiary-light text-pretty bg-accent rounded-lg drop-shadow-xl">
              <h4 className="text-xl font-bold text-left">{faq.question}</h4>
              <p className="text-md text-left pt-4">{faq.answer}</p>
            </div>
          </li>
        ))}
        <li key={`faq_item_site_info`}>
          <div className="my-4 p-2 border-2 border-tertiary-light text-pretty bg-accent rounded-lg drop-shadow-xl">
            <h4 className="text-xl font-bold text-left">
              How was this site made?
            </h4>
            <p className="text-md text-left pt-4">
              It&apos;s homecooked :) <br /> Check out the source code for it on{" "}
              <a
                className="text-blue-800"
                href="https://github.com/kwdowns/kyleandamanda.wedding"
              >
                github
              </a>
            </p>
          </div>
        </li>
      </ul>
    </MainContent>
  );
}
