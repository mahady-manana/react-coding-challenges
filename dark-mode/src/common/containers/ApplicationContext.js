import React from "react";

// define a simple Application context
export const ApplicationContext = React.createContext({});

export const ThemeProvider = ({ children }) => {
	const [darkMode, setDarkMode] = React.useState(false);

	const html = document.querySelector("html");

	// Add dark mode
	if (darkMode) {
		html.classList.add("dark-mode");
	}
	// remove dark mode
	if (!darkMode) {
		html.classList.remove("dark-mode");
	}

	return (
		<ApplicationContext.Provider
			value={{
				darkMode,
				setDarkMode,
			}}
		>
			{children}
		</ApplicationContext.Provider>
	);
};
