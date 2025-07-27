import React, { useEffect } from "react";
import { Link } from "react-router";

const PrivacyPolicy = () => {

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
        PRIVACY POLICY
      </h1>

      <div className="prose prose-lg max-w-none text-[var(--text)]">
        {/* Introduction */}
        <section className="mb-10">
          <p>
            At <strong>Flow Media</strong>, accessible from{" "}
            <Link to='https://flowmediatv.fun' className="text-[var(--primary)] hover:underline">flowmediatv.fun</Link>, we
            prioritize your privacy. This Privacy Policy explains what
            information we collect and how we use it. For questions, contact us
            via helpdesk.
          </p>
        </section>

        {/* Policy Sections */}
        {[
          {
            title: "Information Collection",
            content:
              "We collect information to provide better services to our users.",
            subsections: [
              {
                title: "Log Files",
                content:
                  "We use standard log files that record visitor data including IP addresses, browser type, ISP, timestamps, and pages visited. This non-personally identifiable information helps analyze trends and improve our website.",
              },
              {
                title: "Cookies",
                content:
                  "We use cookies to store visitor preferences and track pages accessed. This helps optimize your experience by customizing content based on your browser and preferences.",
              },
            ],
          },
          {
            title: "Third-Party Services",
            content: "",
            subsections: [
              {
                title: "Advertising Partners",
                content:
                  "Third-party advertisers may use cookies, JavaScript, or web beacons. We have no access to these cookies. Please review their privacy policies for opt-out options.",
              },
              {
                title: "External Links",
                content:
                  "Our Privacy Policy doesn't apply to other websites. Check their policies for data practices.",
              },
            ],
          },
          {
            title: "Data Rights",
            content: "",
            subsections: [
              {
                title: "Your Control",
                content:
                  "You can disable cookies through your browser settings. Refer to your browser's help section for instructions.",
              },
              {
                title: "Policy Changes",
                content:
                  "We reserve the right to modify this policy. Continued use constitutes acceptance of changes.",
              },
            ],
          },
          {
            title: "Children's Privacy",
            content:
              "We don't knowingly collect information from children under 13. If you believe a child has provided us with personal data, contact us immediately for removal.",
          },
          {
            title: "Policy Scope",
            content:
              "This policy applies only to online activities on our website and information voluntarily shared with us. It doesn't cover offline data collection.",
          },
          {
            title: "Consent",
            content:
              "By using our website, you consent to our Privacy Policy and agree to our Terms and Conditions.",
          },
        ].map((section, index) => (
          <section key={index} className="mb-10">
            <h2 className="text-xl font-bold mb-4 text-[var(--primary)]">
              {section.title}
            </h2>
            {section.content && <p className="mb-4">{section.content}</p>}

            {section.subsections &&
              section.subsections.map((subsection, subIndex) => (
                <div
                  key={subIndex}
                  className="mb-6 pl-4 border-l-2 border-[var(--primary)]"
                >
                  <h3 className="text-lg font-semibold mb-2">
                    {subsection.title}
                  </h3>
                  <p>{subsection.content}</p>
                </div>
              ))}
          </section>
        ))}
      </div>
    </section>
  );
};

export default PrivacyPolicy;
