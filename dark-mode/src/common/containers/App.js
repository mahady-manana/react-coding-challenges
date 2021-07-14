import React from "react";
import { ThemeProvider } from "./ApplicationContext";

export default function App({ children }) {
	return <ThemeProvider>{children}</ThemeProvider>;
}
