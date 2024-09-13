import React, { useState, useRef, useEffect } from "react";
import { Fade } from "react-awesome-reveal";


const FAQItem = ({ question, answer }) => {
  const [isOpen, setIsOpen] = useState(false);
  const contentRef = useRef(null); // Reference to the content div

  const toggleFAQ = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    if (isOpen) {
      contentRef.current.style.maxHeight = `${contentRef.current.scrollHeight}px`;
    } else {
      contentRef.current.style.maxHeight = "0";
    }
  }, [isOpen]);

  return (
    <Fade>
    <li>
      <button
        className="relative flex gap-2 items-center w-full py-5 text-base font-semibold text-left border-t md:text-lg border-base-content/10"
        aria-expanded={isOpen}
        onClick={toggleFAQ}
      >
        <span className="flex-1 text-base-content">{question}</span>
        <svg className={`flex-shrink-0 w-4 h-4 ml-auto fill-current transition duration-200 ease-out ${isOpen ? "rotate-45" : ""}`} viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg">
                    <rect y="7" width="16" height="2" rx="1" className="transform origin-center"></rect>
                    <rect y="7" width="16" height="2" rx="1" className="transform origin-center rotate-90"></rect>
                </svg>
      </button>
      <div
        ref={contentRef}
        className="transition-all duration-300 ease-in-out max-h-0 overflow-hidden"
      >
        <div className="pb-5 leading-relaxed">
          <div className="space-y-2 leading-relaxed">{answer}</div>
        </div>
      </div>
    </li>
    </Fade>
  );
};

const FAQList = () => {
  const faqs = [
    {
      question: "How do I join the alumni association?",
      answer: "You can join the alumni association by visiting our registration page and completing the sign-up process."
    },
    {
      question: "Can I update my profile information?",
      answer: "Yes, you can update your profile information by accessing the account settings on your profile page."
    },
    {
      question: "How can I connect with other alumni?",
      answer: "You can connect with other alumni through our alumni network portal, where you can send messages and join groups."
    },
    {
      question: "Is the donation process secure?",
      answer: "Yes, the donation process is secure. We use industry-standard encryption and secure payment gateways to protect your information."
    }
  ];

  return (
    <Fade>
    <div className="py-24 px-8 max-w-5xl mx-auto flex flex-col md:flex-row gap-12">
      <div className="flex flex-col text-left basis-1/2">
        <p className="sm:text-4xl text-3xl font-extrabold text-base-content">Frequently Asked Questions</p>
        <p className="inline-block font-semibold text-primary mb-4">Find answers to common questions about our platform.</p>
      </div>
      <ul className="basis-1/2">
        {faqs.map((faq, index) => (
          <FAQItem key={index} question={faq.question} answer={faq.answer} />
        ))}
      </ul>
    </div>
    </Fade>
  );
};

export default FAQList;
//Updated