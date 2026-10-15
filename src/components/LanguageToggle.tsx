import { useLanguage } from "../context/LanguageContext";

export default function LanguageToggle() {
  const { language, toggleLanguage } = useLanguage();

  return (
    <button
      type="button"
      className="language-toggle"
      onClick={toggleLanguage}
      aria-label={language === "en" ? "Switch to Persian" : "Switch to English"}
      title={language === "en" ? "فارسی" : "English"}
    >
      <span className={language === "en" ? "is-active" : ""}>EN</span>

      <span className="language-toggle__divider">/</span>

      <span className={language === "fa" ? "is-active" : ""}>فا</span>
    </button>
  );
}
