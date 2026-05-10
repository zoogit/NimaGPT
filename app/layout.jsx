import "./globals.css";

export const metadata = {
  title: "Ask My AI Assistant",
  description: "Interactive portfolio assistant for Nima."
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
