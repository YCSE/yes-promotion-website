'use client'

import { useState } from 'react'
import { FAQS as faqs } from '@/lib/faqs'

const FAQSection = () => {
  const [openFaq, setOpenFaq] = useState<number | null>(null)

  return (
    <section
      id="faq"
      data-header-theme="light"
      className="relative w-full scroll-mt-24 bg-white py-0 md:scroll-mt-28"
    >
      <div className="page-shell">
        <div className="mx-auto max-w-[1080px]">
          <div className="mb-[30px] w-full bg-[#eeeeee] md:mb-[40px] lg:mb-[50px]" style={{ height: '1px' }} />

          {faqs.map((faq, index) => {
            const isOpen = openFaq === index

            return (
              <div key={faq.question}>
                {index > 0 && (
                  <div className="my-[30px] w-full bg-[#eeeeee] md:my-[40px] lg:my-[50px]" style={{ height: '1px' }} />
                )}

                <div className="py-[2px]">
                  <button
                    type="button"
                    className="block w-full cursor-pointer"
                    onClick={() => setOpenFaq(isOpen ? null : index)}
                    aria-expanded={isOpen}
                  >
                    <span
                      className={`type-faq block text-center text-text-primary transition-all ${
                        isOpen ? 'font-bold' : 'font-light'
                      }`}
                    >
                      {faq.question}
                    </span>
                  </button>

                  <div
                    className={`grid transition-all duration-500 ease-out ${
                      isOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'
                    }`}
                  >
                    <div className="overflow-hidden">
                      <p className="type-body-base mx-auto mt-6 max-w-[800px] whitespace-pre-line px-4 text-center text-text-primary md:mt-7 md:px-0 lg:mt-8">
                        {faq.answer}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )
          })}

          <div className="mt-[30px] w-full bg-[#eeeeee] md:mt-[40px] lg:mt-[50px]" style={{ height: '1px' }} />
        </div>
      </div>
    </section>
  )
}

export default FAQSection
