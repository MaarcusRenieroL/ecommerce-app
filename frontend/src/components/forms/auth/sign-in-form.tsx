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
import { User } from "@/lib/types.ts";
import { FC } from "react";
import { useToast } from "@/components/ui/use-toast";

type Props = {
  pathName: string;
};

export const SignInForm: FC<Props> = ({ pathName }) => {
  const { toast } = useToast();

  const form = useForm<z.infer<typeof signInSchema>>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: z.infer<typeof signInSchema>) => {
    try {
      const refinedData = {
        email: data.email,
        password: data.password,
      };
      await signInUser(refinedData);

      toast({
        title: "User authenticated successfully",
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
