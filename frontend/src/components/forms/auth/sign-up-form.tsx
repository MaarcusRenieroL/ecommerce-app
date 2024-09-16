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
import { FC } from "react";
import { useToast } from "@/components/ui/use-toast";

type Props = {
  pathName: string;
};

export const SignUpForm: FC<Props> = ({ pathName }) => {
  const { toast } = useToast();

  const form = useForm<z.infer<typeof signUpSchema>>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      username: "",
      password: "",
      confirmPassword: "",
      addressLine1: "",
      addressLine2: "",
      addressLine3: "",
      phoneNumber: "",
      role: "VENDOR",
    },
  });

  const onSubmit = async (data: z.infer<typeof signUpSchema>) => {
    try {
      const refinedData: User = {
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.username,
        username: data.username,
        password: data.password,
        addressLine1: data.addressLine1,
        addressLine2: data.addressLine2,
        addressLine3: data.addressLine3,
        phoneNumber: data.phoneNumber,
        role: pathName === "/auth/sign-up" ? "CUSTOMER" : "VENDOR",
      };

      console.log(refinedData);

      await addUser(refinedData);

      toast({
        title: "User created successfully",
        description: "",
      });
    } catch (error) {
      console.error(error);
      // @ts-expect-error error
      toast.error("Something went wrong", error.message());
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
                    <Label htmlFor="text">Address Line 1</Label>
                  </FormLabel>
                  <FormControl>
                    <Input
                      type="text"
                      placeholder=""
                      required
                      className="w-full"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
              name="addressLine1"
              control={form.control}
            />

            <FormField
              render={({ field }) => (
                <FormItem className="grid gap-2 w-full">
                  <FormLabel>
                    <Label htmlFor="text">Address Line 2</Label>
                  </FormLabel>
                  <FormControl>
                    <Input
                      type="text"
                      placeholder=""
                      required
                      className="w-full"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
              name="addressLine2"
              control={form.control}
            />

            <FormField
              render={({ field }) => (
                <FormItem className="grid gap-2 w-full">
                  <FormLabel>
                    <Label htmlFor="text">Address Line 3</Label>
                  </FormLabel>
                  <FormControl>
                    <Input
                      type="text"
                      placeholder=""
                      required
                      className="w-full"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
              name="addressLine3"
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
