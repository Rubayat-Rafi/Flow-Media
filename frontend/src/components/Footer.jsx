import { Link, useLocation } from "react-router";
import Container from "./Shared/Container";

const Footer = () => {
  const location = useLocation();
  if (
    location.pathname === "/login" ||
    location.pathname === "/signup" ||
    location.pathname.startsWith("/dashboard")
  )
    return null;

  return (
    <div className="bg-[var(--secondary)] py-10">
      <Container>
        <div className="flex items-center justify-between flex-col md:flex-row gap-4">
          <div className="space-y-2">
            <div className="flex flex-col items-start">
              <p className="uppercase font-medium">
                Copyright © {new Date().getFullYear()} Flow Media
              </p>
            </div>
            <div className="flex flex-wrap gap-4">
              <Link to="/terms-and-condition" className="link_css">
                Terms And Conditions
              </Link>
              |
              <Link to="/privacy-policy" className="link_css">
                Privacy Policy
              </Link>
              |
              <Link to="/subscription" className="link_css">
                Pricing
              </Link>
              |
              <Link to="/refund-policy" className="link_css">
                Refund Policy
              </Link>
              |
              <Link
                target="_blank"
                to="https://pub.adsflowmedia.com/panel/auth/register"
                className="link_css"
              >
                Affiliates
              </Link>
              |
              <a href="#" className="link_css">
                Contact Us
              </a>
            </div>
          </div>

          <div className="flex items-center flex-col">
            <div>
              <img src="/logo.png" className="max-h-[32px]" alt="logo" />
            </div>
            <p>Watch For LESS!</p>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default Footer;
