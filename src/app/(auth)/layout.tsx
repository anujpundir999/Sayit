export const metadata = {
  title: 'Sayit - Authentication',
  description: 'Sign in or create an account',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      {children}
    </>
  )
}
