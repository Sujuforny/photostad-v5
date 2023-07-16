"use client";
import { ThemeProvider } from "next-themes";
import React, { useEffect, useState } from "react";

const NextThemeProvider = ({ children }) => {
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);
  if (!mounted) return <>{children}</>;
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="light"
      themes={["light", "dark"]}
    >
      {children}
    </ThemeProvider>
  );
};

export default NextThemeProvider;
