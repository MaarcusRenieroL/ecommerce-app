import { Label } from "@/components/ui/label.tsx";
import { Input } from "@/components/ui/input.tsx";
import { Button } from "@/components/ui/button.tsx";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { signUpSchema } from "@/lib/zod-schema.ts";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form.tsx";
import { addUser } from "@/lib/spring-boot-api.ts";
import { User } from "@/lib/types.ts";
import { useToast } from "@/components/ui/use-toast";
import { useNavigate } from "react-router-dom";

export const SignUpForm = () => {
  const { toast } = useToast();
  const navigate = useNavigate();

  const form = useForm<z.infer<typeof signUpSchema>>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      username: "",
      password: "",
      confirmPassword: "",
      phoneNumber: "",
      role: "",
      hasBusinessAccount: false,
    },
  });

  const onSubmit = async (data: z.infer<typeof signUpSchema>) => {
    const refinedData: User = {
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.username,
      username: data.username,
      password: data.password,
      phoneNumber: data.phoneNumber,
      role: "CUSTOMER",
      hasBusinessAccount: false,
    };

    console.log(refinedData);

    const response = await addUser(refinedData);

    if (response.status === "CREATED") {
      toast({
        title: "Success",
        description: response.message,
      });
      
      navigate("/auth/sign-in")
    } else {
      toast({
        title: "Error",
        description: response.message,
      });
    }
  };

  return (
    <div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className="space-y-4">
            <div className="flex items-center justify-between w-full gap-5">
              <FormField
                render={({ field }) => (
                  <FormItem className="grid gap-2 w-full">
                    <FormLabel>
                      <Label htmlFor="text">First Name</Label>
                    </FormLabel>
                    <FormControl>
                      <Input
                        type="text"
                        placeholder="John"
                        required
                        className="w-full"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
                name="firstName"
                control={form.control}
              />

              <FormField
                render={({ field }) => (
                  <FormItem className="grid gap-2 w-full">
                    <FormLabel>
                      <Label htmlFor="text">Last Name</Label>
                    </FormLabel>
                    <FormControl>
                      <Input
                        type="text"
                        placeholder="Doe"
                        required
                        className="w-full"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
                name="lastName"
                control={form.control}
              />
            </div>

            <FormField
              render={({ field }) => (
                <FormItem className="grid gap-2 w-full">
                  <FormLabel>
                    <Label htmlFor="text">Email</Label>
                  </FormLabel>
                  <FormControl>
                    <Input
                      type="username"
                      placeholder="john.doe@gmail.com"
                      required
                      className="w-full"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
              name="username"
              control={form.control}
            />

            <FormField
              render={({ field }) => (
                <FormItem className="grid gap-2 w-full">
                  <FormLabel>
                    <Label htmlFor="text">Password</Label>
                  </FormLabel>
                  <FormControl>
                    <Input
                      type="password"
                      placeholder="*********"
                      required
                      className="w-full"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
              name="password"
              control={form.control}
            />

            <FormField
              render={({ field }) => (
                <FormItem className="grid gap-2 w-full">
                  <FormLabel>
                    <Label htmlFor="text">Confirm Password</Label>
                  </FormLabel>
                  <FormControl>
                    <Input
                      type="password"
                      placeholder="******"
                      required
                      className="w-full"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
              name="confirmPassword"
              control={form.control}
            />

            <FormField
              render={({ field }) => (
                <FormItem className="grid gap-2 w-full">
                  <FormLabel>
                    <Label htmlFor="text">Phone Number</Label>
                  </FormLabel>
                  <FormControl>
                    <Input
                      type="tel"
                      placeholder=""
                      required
                      className="w-full"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
              name="phoneNumber"
              control={form.control}
            />

            <Button type="submit" className="w-full">
              Sign Up
            </Button>
            <Button variant="outline" className="w-full">
              Sign Up with Google
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};
