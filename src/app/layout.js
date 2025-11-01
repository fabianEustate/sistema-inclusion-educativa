export const metadata = {
  title: 'Sistema Inclusión Educativa',
  description: 'Aplicación de inclusión educativa',
}

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <body>{children}</body>
    </html>
  )
}
