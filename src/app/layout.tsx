import "./globals.css";
import "leaflet/dist/leaflet.css";
import { Providers } from "./providers";
import LoadingWrapper from "../components/LoadingWrapper";

export const metadata = {
  title: "Fishers",
  description: "Explore fish species worldwide", 
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <Providers>
          <LoadingWrapper>{children}</LoadingWrapper>
        </Providers>
      </body>
    </html>
  );
}
