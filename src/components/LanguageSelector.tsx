import { useTranslation } from "react-i18next";

const LANGS = [
  { code: "pt-BR", label: "PT" },
  { code: "en-US", label: "EN" },
  { code: "es-ES", label: "ES" },
];

const LanguageSelector = () => {
  const { i18n } = useTranslation();
  const current = i18n.language;

  return (
    <div className="flex items-center gap-1">
      {LANGS.map((lang) => (
        <button
          key={lang.code}
          onClick={() => i18n.changeLanguage(lang.code)}
          className="font-inter transition-opacity"
          style={{
            fontSize: "10px",
            letterSpacing: "0.1em",
            padding: "4px 8px",
            borderRadius: "4px",
            color: current === lang.code ? "#C8B870" : "rgba(207,197,184,0.35)",
            background: current === lang.code ? "rgba(200,184,112,0.08)" : "transparent",
            border: current === lang.code ? "1px solid rgba(200,184,112,0.2)" : "1px solid transparent",
            cursor: "pointer",
          }}
        >
          {lang.label}
        </button>
      ))}
    </div>
  );
};

export default LanguageSelector;
