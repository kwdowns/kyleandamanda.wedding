import { Metadata } from "next";
import React from "react";
import * as faqData from "@/data/faq";
import MainContent from "@/components/MainContent";
import FaqItem from "@/components/FaqItem";
import Link from "next/link";

export const metadata: Metadata = {
  title: "FAQ | Kyle and Amanda",
};

export default function Faq() {
  const faqs = faqData.faqs;

  return (
    <MainContent>
      <header className="my-8 text-center text-4xl">
        Frequently Asked Questions
      </header>
      <ul>
        {faqs.map((faq, index) => (
          <FaqItem
            title={faq.question}
            answer={faq.answer}
            key={`faq-item-${index}`}
          />
        ))}
        <FaqItem title="I have a question that I just can’t find the answer to, what is the best way to contact you?">
          <p>
            You can reach out to either of us directly or email us at{" "}
            <a
              className="text-blue-800"
              href="mailto:info@kyleandamanda.wedding"
            >
              info@kyleandamanda.wedding
            </a>
          </p>
        </FaqItem>
        <FaqItem title="Are you registered? Where should we ship your gift?">
          <p>
            Yes we are registered, you can find more information on our
            <Link className="text-blue-800" href="/registry">
              {" "}
              registry page{" "}
            </Link>
            on this site.
          </p>
        </FaqItem>
        <FaqItem title="How was this site made?">
          <p className="text-md text-left pt-4">
            It&apos;s homecooked :) <br /> Check out the source code for it on
            <a
              className="text-blue-800"
              href="https://github.com/kwdowns/kyleandamanda.wedding"
            >
              github
            </a>
          </p>
        </FaqItem>
      </ul>
    </MainContent>
  );
}
