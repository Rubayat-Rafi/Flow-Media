import useSilentExtensionBlocker from "../../hooks/useSilentExtensionBlocker.js";

const SilentExtensionBlocker = ({ children }) => {
  useSilentExtensionBlocker();

  return <>{children}</>;
};

export default SilentExtensionBlocker;
