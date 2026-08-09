import "./globals.css";

export const metadata = {
  title: "Nima Maghame | Design Manager & Creative Leader",
  description:
    "Portfolio of Nima Maghame, a design manager and creative leader focused on branding, digital products, creative operations, and AI-assisted workflows."
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
