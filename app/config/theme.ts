export interface CustomTheme {
  colors: {
    background: string;
    background200: string;
    border: string;
    danger: string;
    gray: string;
    mediumText: string;
    primary: string;
    text: string;
    white: string;
  };
  dark: boolean;
}

const LightTheme: CustomTheme = {
  colors: {
    background: "#fff",
    background200: "#f5f5f5",
    border: "#ddd",
    danger: "#b91c1c",
    gray: "gray",
    mediumText: "#676354",
    primary: "#171100",
    text: "#171100",
    white: "#fff",
  },

  dark: false,
};

const DarkTheme: CustomTheme = {
  colors: {
    background: "#fff",
    background200: "#f5f5f5",
    border: "#ddd",
    danger: "#b91c1c",
    gray: "gray",
    mediumText: "#676354",
    primary: "#171100",
    text: "#171100",
    white: "#fff",
    // background: "#171717",
    // background200: "#1f1f1f",
    // border: "#333",
    // danger: "#ff5252",
    // gray: "#999",
    // mediumText: "#ccc",
    // primary: "#ffd700",
    // text: "#fff",
    // white: "#fff",
  },

  dark: true,
};

export { LightTheme, DarkTheme };
