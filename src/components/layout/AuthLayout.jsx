/**
 * AuthLayout - Minimal layout for authentication pages
 * No sidebar, header, or footer
 */
export default function AuthLayout({ children }) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 to-primary-100">
      {children}
    </div>
  );
}
