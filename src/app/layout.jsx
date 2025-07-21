import "./globals.css";
import Navbar from "../components/Navbar";

export const metadata = {
  title: "eCRF Portal",
  description: "Electronic Case Report Forms for Clinical Trials",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-gray-50 min-h-screen">
        <Navbar />
        <main>{children}</main>
      </body>
    </html>
  );
}
