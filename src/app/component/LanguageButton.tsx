"use client";

import { useTranslation } from "react-i18next";
import { useState } from "react";

interface LanguageButtonProps {
  koLabel?: string; // 한국어 표시
  jaLabel?: string; // 일본어 표시
}

export default function LanguageButton({
  koLabel = "한국어",
  jaLabel = "日本語",
}: LanguageButtonProps) {
  const { i18n } = useTranslation();
  const [lang, setLang] = useState(i18n.language || "ko");

  const toggleLanguage = (selectedLang: "ko" | "ja") => {
    i18n.changeLanguage(selectedLang);
    setLang(selectedLang);
  };

  return (
    <div className="flex gap-2 items-center justify-center p-2 bg-white rounded-md shadow-md">
      {/* 언어 선택 버튼 */}
      <button
        onClick={() => toggleLanguage("ko")}
        className={`px-3 py-1 rounded ${lang === "ko" ? "bg-blue-500 text-white" : "bg-gray-100 text-gray-700"}`}
      >
        {koLabel}
      </button>
      <span className="text-gray-400">|</span>
      <button
        onClick={() => toggleLanguage("ja")}
        className={`px-3 py-1 rounded ${lang === "ja" ? "bg-blue-500 text-white" : "bg-gray-100 text-gray-700"}`}
      >
        {jaLabel}
      </button>
    </div>
  );
}
