import '../styles/globals.css';

export const metadata = {
  title: 'EsportsLyzer — Match Analytics',
  description: 'CS2 match results, player statistics, and multi-sport analytics',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
