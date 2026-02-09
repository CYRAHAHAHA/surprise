export default {
    content: ["./index.html", "./src/**/*.{ts,tsx}"],
    theme: {
        extend: {
            colors: {
                lavender: "#F3E8FF",
                softpink: "#FCE7F3",
                plum: "#7C3AED",
                rose: "#FB7185",
                ink: "#1F1B24",
            },
            fontFamily: {
                display: ["'Fraunces'", "serif"],
                body: ["'Manrope'", "sans-serif"],
            },
            boxShadow: {
                glow: "0 20px 60px rgba(124, 58, 237, 0.25)",
            },
            borderRadius: {
                mega: "2.5rem",
            },
            backdropBlur: {
                heavy: "24px",
            },
            animation: {
                floaty: "floaty 12s ease-in-out infinite",
            },
            keyframes: {
                floaty: {
                    "0%, 100%": { transform: "translateY(0px)" },
                    "50%": { transform: "translateY(-12px)" },
                },
            },
        },
    },
    plugins: [],
};
