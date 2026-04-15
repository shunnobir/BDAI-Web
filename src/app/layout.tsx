// This is the root layout — it intentionally has NO navbar/footer
// because the (payload) admin group needs its own full-page shell.
// The (frontend) layout adds navbar + footer for public pages.

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>{children}</body>
    </html>
  );
}
