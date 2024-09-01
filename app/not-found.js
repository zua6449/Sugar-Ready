// app/not-found.tsx
import Link from 'next/link';

const NotFound = () => {
  return (
    <div className="text-center py-20">
      <h1 className="text-6xl font-bold">404</h1>
      <p className="text-2xl mt-4">Page not found</p>
      <Link href="/" className="text-blue-500 underline mt-4">Go back to Home</Link>
    </div>
  );
};

export default NotFound;
