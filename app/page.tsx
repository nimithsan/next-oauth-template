import { redirect } from 'next/navigation';
import LoginForm from './components/LoginForm';
import { auth } from './auth';

export default async function Home() {
  // Check if user is already authenticated
  const session = await auth();
  
  // If user is logged in, redirect to dashboard
  if (session) {
    redirect('/dashboard');
  }

  // Show login form for unauthenticated users
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50">
      <LoginForm />
    </div>
  );
}
