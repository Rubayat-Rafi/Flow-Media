import { useEffect } from "react";

const TermsAndConditions = () => {
useEffect(() => {
  window.scrollTo({
    top: 0,
    left: 0,
    behavior: 'smooth' 
  });
}, []); 


  return (
    <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 scroll-mt-40">
      <h1 className="text-3xl font-bold text-center mb-8 text-[var(--primary)] border-b-2 border-[var(--primary)] pb-4">
        TERMS AND CONDITIONS
      </h1>

      <div className="prose prose-lg max-w-none text-[var(--text)]">
        {/* Introduction */}
        <section className="mb-10">
          <p>
            By accessing this website, you acknowledge that you have read,
            understood, and agree to be bound by these Terms and Conditions in
            their entirety. If you do not agree to all terms, you must
            immediately discontinue use of this website.
          </p>
        </section>

        {/* Definitions */}
        <section className="mb-10 bg-[var(--bg-secondary)] p-6 rounded-lg">
          <h2 className="text-xl font-bold mb-4 text-[var(--primary)]">
            Definitions
          </h2>
          <ul className="space-y-2">
            <li>
              <strong>"User", "You", "Your"</strong>: The individual accessing
              this website
            </li>
            <li>
              <strong>"Company", "We", "Our", "Us"</strong>: Refers to{" "}
              <span className="text-[var(--primary)] font-medium">
                Flow Media
              </span>
            </li>
            <li>
              <strong>"Parties"</strong>: Collectively refers to both the User
              and the Company
            </li>
          </ul>
        </section>

        {/* Sections */}
        {[
          {
            title: "Cookies",
            content:
              "We employ the use of cookies. By using the website you consent to cookies in accordance with our privacy policy. Cookies enable us to retrieve user details for each visit and are used to enable functionality and ease of use. Some affiliate/advertising partners may also use cookies.",
          },
          {
            title: "Hyperlinking to Our Content",
            content:
              "Written approval is required to hyperlink to our website: (1) By use of our corporate name; (2) By use of our URL; or (3) By description that makes sense in context. No use of Flow Media TV logo or artwork is allowed without a trademark license agreement.",
          },
          {
            title: "iFrames",
            content:
              "Without prior approval and express written permission, you may not create frames around our web pages or use techniques that alter the visual presentation of our website.",
          },
          {
            title: "Reservation of Rights",
            content:
              "We reserve the right to request removal of links to our site at any time. We may amend these terms and linking policy at any time. By continuing to link to our site, you agree to abide by these terms.",
          },
          {
            title: "Removal of Links",
            content:
              "If you find any link objectionable, you may contact us. We will consider removal requests but have no obligation to do so. While we endeavor to ensure information is correct, we don't warrant its completeness or accuracy, nor guarantee the website's availability or that content is kept up-to-date.",
          },
          {
            title: "Refund Policy and Disputes",
            content:
              "Either party may terminate services. Refund requests must be made within 24 hours of purchase and will be processed within 30 days. After 24 hours, no refunds will be processed. Opening a payment dispute without our consent voids all service agreements and may result in account termination.",
          },
          {
            title: "Auto Billing",
            content:
              "Your membership continues until terminated. You must maintain a valid Payment Method. We will auto-charge your Payment Method each billing cycle unless canceled. To cancel auto-billing, contact us via helpdesk or live chat. No refunds for auto-billed charges.",
          },
          {
            title: "Notification of Changes",
            content:
              "Flow Media TV reserves the right to modify these terms at any time. Continued use signifies acceptance of changes.",
          },
          {
            title: "Disclaimer",
            content:
              "To the maximum extent permitted by law, we will not be liable for any loss or damage. These terms are governed by Icelandic law. Any disputes will be subject to the exclusive jurisdiction of Icelandic courts.",
          },
          {
            title: "Contact Details",
            content: "For any inquiries, please contact us via helpdesk.",
          },
        ].map((section, index) => (
          <section key={index} className="mb-8">
            <h2 className="text-xl font-bold mb-3 text-[var(--primary)]">
              {section.title.toUpperCase()}
            </h2>
            <p>{section.content}</p>
          </section>
        ))}
      </div>
    </section>
  );
};

export default TermsAndConditions;
