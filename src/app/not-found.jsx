import Link from 'next/link';

export const metadata = {
  title: '404 — Сторінку не знайдено',
  description: 'Сторінку не знайдено. Поверніться на головну сторінку HelpLift.',
  robots: {
    index: false,
    follow: false,
  },
};

export default function NotFound() {
  return (
    <div
      style={{
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        color: 'white',
        gap: '20px',
      }}
    >
      <h1>404</h1>
      <p>Сторінку не знайдено</p>
      <Link href="/" style={{ color: '#999b9e', textDecoration: 'underline' }}>
        На головну
      </Link>
    </div>
  );
}
