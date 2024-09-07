import { Navbar } from "@/components/navigation/navbar.tsx";
import { Button } from "@/components/ui/button";

export const VerifyEmailPage = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 flex items-center justify-center">
        <div className="w-full max-w-md px-4 py-8">
          <h1 className="text-3xl font-bold mb-6 text-center">
            Reset Password
          </h1>
          <form className="space-y-4">
            <p className="text-center">
              Click here to send the verification email
            </p>
            <Button type="submit" className="w-full">
              Verify Email
            </Button>
          </form>
        </div>
      </main>
    </div>
  );
};
