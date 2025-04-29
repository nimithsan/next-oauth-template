import { redirect } from "next/navigation";
import { auth, signOut } from "@/app/auth";
import Image from "next/image";

export default async function Dashboard() {
  const session = await auth();

  if (!session || !session.user) {
    redirect("/");
  }

  return (
    <div className="flex min-h-screen flex-col bg-gray-50 p-4">
      <div className="mx-auto w-full max-w-4xl rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
        <div className="mb-6 flex items-center justify-between">
          <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
          <form
            action={async () => {
              "use server";
              await signOut({ redirectTo: "/" });
            }}
          >
            <button
              type="submit"
              className="rounded-md bg-gray-100 px-4 py-2 text-sm text-gray-700 hover:bg-gray-200"
            >
              Sign Out
            </button>
          </form>
        </div>

        <div className="flex flex-col items-center space-y-4 rounded-lg bg-blue-50 p-6 text-center">
          {session.user.image ? (
            <Image
              src={session.user.image}
              alt="Profile"
              width={96}
              height={96}
              className="h-24 w-24 rounded-full object-cover"
            />
          ) : (
            <Image
              src="/placeholder-avatar.svg"
              alt="Profile"
              width={96}
              height={96}
              className="h-24 w-24 rounded-full"
            />
          )}
          <h2 className="text-xl font-semibold text-gray-900">
            Welcome, {session.user.name || "User"}!
          </h2>
          <p className="text-gray-600">{session.user.email}</p>
        </div>
      </div>
    </div>
  );
} 