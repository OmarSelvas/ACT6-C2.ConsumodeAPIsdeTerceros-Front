export const metadata = {
  title: 'GameBrain Explorer — SOA',
  description: 'Consumo de GameBrain API con arquitectura SOA desacoplada',
};

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <head>
        <script src="https://cdn.tailwindcss.com"></script>
        <script dangerouslySetInnerHTML={{__html: `
          tailwind.config = {
            theme: {
              extend: {
                colors: {
                  brand: '#22c55e',
                }
              }
            }
          }
        `}} />
      </head>
      <body className="bg-gray-950 text-white min-h-screen">{children}</body>
    </html>
  );
}
