import './globals.css';

export const metadata = {
  title: 'GameBrain Explorer — SOA',
  description: 'Consumo de GameBrain API con arquitectura SOA desacoplada',
};

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <body className="bg-gray-950 text-white min-h-screen">{children}</body>
    </html>
  );
}
