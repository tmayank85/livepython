import type { Metadata } from "next";
import styles from  "../styles/globals.module.css";



export const metadata: Metadata = {
  title: "Live Python | Compiler",
  description: "Python compiler with real time output",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={styles.body}>
        {children}
      </body>
    </html>
  );
}
