// Layout for the auth pages
import "./globals.css";

export const metadata = { // Cambiar //
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function AuthLayout({ children }) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  );
}