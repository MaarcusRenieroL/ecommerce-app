import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { SignInForm } from "@/components/forms/auth/sign-in-form";

export const SignInPage = () => {
  return (
    <div
      style={{
        height: "100vh",
      }}
      className="flex items-center justify-center w-full h-full"
    >
      <div className="w-full h-full lg:grid lg:grid-cols-2">
        <div className="flex items-center justify-center py-12">
          <div className="mx-auto grid w-[350px] gap-6">
            <div className="grid gap-2 text-center">
              <h1 className="text-3xl font-bold">Sign In</h1>
              <p className="text-balance text-muted-foreground">
                Enter your email below to login to your account
              </p>
            </div>
            <SignInForm pathName="/auth/sign-in" />
            <div className="mt-4 text-center text-sm">
              Don&apos;t have an account?{" "}
              <a href="/auth/sign-up" className="underline">
                Sign up
              </a>
            </div>
          </div>
        </div>
        <div className="hidden bg-muted lg:block">
          <img
            src="/assets/placeholder.svg"
            alt="Image"
            width="1920"
            height="1080"
            className="h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
          />
        </div>
      </div>
    </div>
  );
};
