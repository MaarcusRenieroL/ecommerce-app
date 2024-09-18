import { Label } from "@/components/ui/label.tsx";
import { Input } from "@/components/ui/input.tsx";
import { Button } from "@/components/ui/button.tsx";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { signInSchema } from "@/lib/zod-schema.ts";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form.tsx";
import { signInUser } from "@/lib/spring-boot-api.ts";
import { FC } from "react";
import { useToast } from "@/components/ui/use-toast";
import { useNavigate } from "react-router-dom";

type Props = {
  pathName: string;
};

export const SignInForm: FC<Props> = () => {
  const { toast } = useToast();
  const navigate = useNavigate();

  const form = useForm<z.infer<typeof signInSchema>>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: z.infer<typeof signInSchema>) => {
      const refinedData = {
        email: data.email,
        password: data.password,
      };

      const response = await signInUser(refinedData);

      if (response.statusCode === "OK") {
        toast({
          title: "Success",
          description: response.message
        });

        if (response.data.role === "CUSTOMER") {
          navigate("/");
        } else if (response.data.role === "VENDOR") {
          navigate("/vendor/dashboard");
        }
      } else {
        toast({
          title: "Error",
          description: response.message
        })
      }
  };

  return (
    <div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className="space-y-4">
            <FormField
              render={({ field }) => (
                <FormItem className="grid gap-2 w-full">
                  <FormLabel>
                    <Label htmlFor="text">Email</Label>
                  </FormLabel>
                  <FormControl>
                    <Input
                      type="email"
                      placeholder="john.doe@gmail.com"
                      required
                      className="w-full"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
              name="email"
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

            <Button type="submit" className="w-full">
              Sign In
            </Button>
            <Button variant="outline" className="w-full">
              Sign In with Google
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};
