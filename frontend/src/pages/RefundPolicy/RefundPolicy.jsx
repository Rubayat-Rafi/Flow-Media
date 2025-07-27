import { useEffect } from "react";
import { Link } from "react-router";

const RefundPolicy = () => {
  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
  }, []);

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8 scroll-mt-40">
      <div className=" shadow-md overflow-hidden p-6 sm:p-8 ">
        <h1 className="text-3xl font-bold text-center mb-6 text-[var(--primary)] uppercase">
          FLOW MEDIA REFUND POLICY
        </h1>

        <div className="prose prose-lg max-w-none text-[var(--text)]">
          {/* Introduction */}
          <section className="mb-8 bg-[var(--secondary)] p-4 rounded-lg border-l-4 border-[var(--primary)]">
            <p className="font-medium">
              We stand behind our service with a 100% money-back guarantee
              within the first 24 hours of your subscription. If you encounter
              any issues, please contact our support team for assistance before
              requesting a refund.
            </p>
          </section>

          {/* When Refunds Are Granted */}
          <section className="mb-8">
            <h2 className="text-xl font-bold mb-4 text-[var(--primary)] flex items-center">
              <svg
                className="w-5 h-5 mr-2 text-green-600"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                  clipRule="evenodd"
                />
              </svg>
              Refunds We Grant
            </h2>
            <ul className="space-y-2 pl-5">
              <li className="flex items-start">
                <span className="text-green-600 mr-2">✓</span>
                If we cannot resolve technical issues with our service
              </li>
              <li className="flex items-start">
                <span className="text-green-600 mr-2">✓</span>
                If our support team cannot fix your problem
              </li>
              <li className="flex items-start">
                <span className="text-green-600 mr-2">✓</span>
                If service is not as described
              </li>
            </ul>
          </section>

          {/* When Refunds Are Not Granted */}
          <section className="mb-8">
            <h2 className="text-xl font-bold mb-4 text-[var(--primary)] flex items-center">
              <svg
                className="w-5 h-5 mr-2 text-red-600"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                  clipRule="evenodd"
                />
              </svg>
              Refunds We Cannot Grant
            </h2>
            <ul className="space-y-2 pl-5">
              <li className="flex items-start">
                <span className="text-red-600 mr-2">✗</span>
                Change of mind after purchase
              </li>
              <li className="flex items-start">
                <span className="text-red-600 mr-2">✗</span>
                Simply deciding not to use the subscription
              </li>
              <li className="flex items-start">
                <span className="text-red-600 mr-2">✗</span>
                If the service doesn't meet your specific needs (when
                functioning as described)
              </li>
              <li className="flex items-start">
                <span className="text-red-600 mr-2">✗</span>
                For customers who have previously received refunds
              </li>
            </ul>
          </section>

          {/* Terms & Conditions */}
          <section className="mb-8  p-4 rounded-lg bg-[var(--secondary)]">
            <h2 className="text-xl font-bold mb-3 text-[var(--primary)]">
              Terms & Conditions
            </h2>
            <ul className="space-y-3">
              <li className="flex items-start">
                <span className="text-[var(--primary)] mr-2">•</span>
                Refunds are processed within 5-7 business days
              </li>
              <li className="flex items-start">
                <span className="text-[var(--primary)] mr-2">•</span>
                No refunds after 24 hours from purchase
              </li>
              <li className="flex items-start">
                <span className="text-[var(--primary)] mr-2">•</span>
                We reserve the right to reject refund requests that don't meet
                our policy criteria
              </li>
              <li className="flex items-start">
                <span className="text-[var(--primary)] mr-2">•</span>
                Refunds will be issued to the original payment method
              </li>
            </ul>
          </section>

          {/* How to Request */}
          <section className="text-center">
            <h3 className="text-lg font-semibold mb-3">
              Need to request a refund?
            </h3>
            <Link to="/" className="primary-btn">
              Contact Our Support Team
            </Link>
            <p className="mt-3 text-sm text-[var(--text-secondary)]">
              Please have your order details ready when contacting us
            </p>
          </section>
        </div>
      </div>
    </div>
  );
};

export default RefundPolicy;
