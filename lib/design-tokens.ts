export const designTokens = {
  color: {
    dark: {
      bg: "#07080C",
      surface: "#0E1016",
      surfaceRaised: "#141722",
      border: "rgba(255, 255, 255, 0.08)",
      text: "#F4F5F8",
      muted: "#9AA0B4",
    },
    light: {
      bg: "#FAFAFB",
      surface: "#FFFFFF",
      surfaceRaised: "#F1F2F6",
      border: "rgba(11, 12, 16, 0.1)",
      text: "#0B0C10",
      muted: "#62697B",
    },
    accent: ["#7C5CFF", "#22D3EE"] as const,
    gradient: "linear-gradient(135deg, #7C5CFF, #22D3EE)",
  },
  typography: {
    heading: "Space Grotesk",
    body: "Inter",
    mono: "JetBrains Mono",
  },
  layout: {
    container: "1200px",
    cardRadius: "20px",
    buttonRadius: "999px",
    inputRadius: "12px",
    sectionPaddingDesktop: "120px",
    sectionPaddingMobile: "72px",
  },
} as const;
