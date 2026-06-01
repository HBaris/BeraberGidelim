"use client";

import { useState, useEffect } from "react";

export function usePremium() {
  const [isPremium, setIsPremium] = useState(false);

  useEffect(() => {
    setIsPremium(localStorage.getItem("bbg_premium") === "true");
  }, []);

  function activate() {
    localStorage.setItem("bbg_premium", "true");
    setIsPremium(true);
  }

  function deactivate() {
    localStorage.removeItem("bbg_premium");
    setIsPremium(false);
  }

  return { isPremium, activate, deactivate };
}
