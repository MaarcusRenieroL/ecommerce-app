import { SignUpForm } from "@/components/forms/auth/sign-up-form.tsx";

export const SignUpPage = () => {
  return (
    <div
      style={{
        height: "100vh",
      }}
      className="flex items-center justify-center w-full h-full"
    >
      <div className="w-full h-full lg:grid lg:grid-cols-2">
        <div className="flex items-center justify-center py-12">
          <div className="mx-auto grid w-3/4 gap-6">
            <div className="grid gap-2 text-center">
              <h1 className="text-3xl font-bold">Sign Up</h1>
              <p className="text-balance text-muted-foreground">
                Create an account
              </p>
            </div>
            <SignUpForm pathName="/auth/sign-up" />
            <div className="space-y-3 flex flex-col items-center justify-center">
              <div className="mt-4 text-center text-sm">
                Already have an account?{" "}
                <a href="/auth/sign-in" className="underline">
                  Sign in
                </a>
              </div>
              <p>or</p>
              <div className="mt-4 text-center text-sm">
                Create a business account{" "}
                <a href="/auth/business/sign-up" className="underline">
                  Sign Up
                </a>
              </div>
            </div>
          </div>
        </div>
        <div className="hidden bg-muted lg:block">
          <img
            src="/assets/placeholder.svg"
            alt="Image"
            width="1920"
            height="1080"
            className="h-full w-full object-cover"
          />
        </div>
      </div>
    </div>
  );
};
