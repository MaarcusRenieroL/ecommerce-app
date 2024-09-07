import { Button } from "@/components/ui/button.tsx";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea.tsx";

export const BusinessSignUpPage = () => {
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
                Create a vendor account
              </p>
            </div>
            <div className="grid gap-4">
              <form className="space-y-4">
                <div>
                  <Label htmlFor="businessName">Business Name</Label>
                  <Input id="businessName" name="businessName" required />
                </div>
                <div>
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" name="email" type="email" required />
                </div>
                <div>
                  <Label htmlFor="password">Password</Label>
                  <div className="relative">
                    <Input
                      id="password"
                      name="password"
                      type="password"
                      required
                    />
                  </div>
                </div>
                <div>
                  <Label htmlFor="phoneNumber">Phone Number</Label>
                  <Input
                    id="phoneNumber"
                    name="phoneNumber"
                    type="tel"
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="address">Business Address</Label>
                  <Input id="address" name="address" required />
                </div>
                <div>
                  <Label htmlFor="description">Business Description</Label>
                  <Textarea id="description" name="description" required />
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="agreeTerms" name="agreeTerms" />
                  <Label htmlFor="agreeTerms">
                    I agree to the{" "}
                    <a href="/terms" className="text-blue-500 hover:underline">
                      Terms and Conditions
                    </a>
                  </Label>
                </div>
                <Button type="submit" className="w-full">
                  Create Vendor Account
                </Button>
              </form>
            </div>
            <p className="mt-4 text-center">
              Already have a vendor account?{" "}
              <a href="/auth/sign-in" className="text-blue-500 hover:underline">
                Sign in
              </a>
            </p>
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
