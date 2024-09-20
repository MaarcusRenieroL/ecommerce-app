import { Input } from "@/components/ui/input.tsx";
import { Button } from "@/components/ui/button.tsx";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { businessSchema } from "@/lib/zod-schema.ts";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form.tsx";
import { addBusiness } from "@/lib/spring-boot-api.ts";
import { useToast } from "@/components/ui/use-toast";
import { Textarea } from "../ui/textarea";

export const CreateBusinessForm = () => {
  const { toast } = useToast();

  const form = useForm<z.infer<typeof businessSchema>>({
    resolver: zodResolver(businessSchema),
    defaultValues: {
      businessName: "",
      businessDescription: "",
      businessEmail: "",
      businessPhone: "",
      addressline1: "",
      addressline2: "",
      addressline3: "",
      postalCode: "",
      websiteUrl: "",
      logoUrl: "",
    },
  });

  const onSubmit = async (data: z.infer<typeof businessSchema>) => {
    console.log(data);
    const response = await addBusiness(data);
    if (response.statusCode === 201) {
      toast({
        title: "Success",
        description: response.message,
      });
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
            <FormField
              render={({ field }) => (
                <FormItem className="grid gap-2 w-full">
                  <FormLabel>Business Name</FormLabel>
                  <FormControl>
                    <Input
                      type="text"
                      placeholder="John's Bakery"
                      className="w-full"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
              name="businessName"
              control={form.control}
            />

            <FormField
              render={({ field }) => (
                <FormItem className="grid gap-2 w-full">
                  <FormLabel>Business Description</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="A local bakery offering fresh breads and pastries"
                      className="w-full"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
              name="businessDescription"
              control={form.control}
            />
            <div className="flex items-center justify-between w-full gap-5">
              <FormField
                render={({ field }) => (
                  <FormItem className="grid gap-2 w-full">
                    <FormLabel>Business Email</FormLabel>
                    <FormControl>
                      <Input
                        type="email"
                        placeholder="contact@johnsbakery.com"
                        className="w-full"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
                name="businessEmail"
                control={form.control}
              />

              <FormField
                render={({ field }) => (
                  <FormItem className="grid gap-2 w-full">
                    <FormLabel>Business Phone</FormLabel>
                    <FormControl>
                      <Input
                        type="tel"
                        placeholder="+1 234 567 8900"
                        className="w-full"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
                name="businessPhone"
                control={form.control}
              />
            </div>

            <div className="grid gird-cols-1 md:grid-cols-2 gap-5">
              <FormField
                render={({ field }) => (
                  <FormItem className="grid gap-2 w-full">
                    <FormLabel>Address Line 1</FormLabel>
                    <FormControl>
                      <Input
                        type="text"
                        placeholder="123 Main Street"
                        className="w-full"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
                name="addressline1"
                control={form.control}
              />

              <FormField
                render={({ field }) => (
                  <FormItem className="grid gap-2 w-full">
                    <FormLabel>Address Line 2</FormLabel>
                    <FormControl>
                      <Input
                        type="text"
                        placeholder="Suite 100"
                        className="w-full"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
                name="addressline2"
                control={form.control}
              />

              <FormField
                render={({ field }) => (
                  <FormItem className="grid gap-2 w-full">
                    <FormLabel>Address Line 3</FormLabel>
                    <FormControl>
                      <Input
                        type="text"
                        placeholder="Building B"
                        className="w-full"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
                name="addressline3"
                control={form.control}
              />

              <FormField
                render={({ field }) => (
                  <FormItem className="grid gap-2 w-full">
                    <FormLabel>Postal Code</FormLabel>
                    <FormControl>
                      <Input
                        type="text"
                        placeholder="12345"
                        className="w-full"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
                name="postalCode"
                control={form.control}
              />
            </div>

            <div className="flex items-center justify-between w-full gap-5">
              <FormField
                render={({ field }) => (
                  <FormItem className="grid gap-2 w-full">
                    <FormLabel>Website URL</FormLabel>
                    <FormControl>
                      <Input
                        type="url"
                        placeholder="https://www.johnsbakery.com"
                        className="w-full"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
                name="websiteUrl"
                control={form.control}
              />

              <FormField
                render={({ field }) => (
                  <FormItem className="grid gap-2 w-full">
                    <FormLabel>Logo URL</FormLabel>
                    <FormControl>
                      <Input
                        type="url"
                        placeholder="https://www.johnsbakery.com/logo.png"
                        className="w-full"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
                name="logoUrl"
                control={form.control}
              />
            </div>
          </div>
          <Button type="submit" className="w-full mt-5">
            Submit
          </Button>
        </form>
      </Form>
    </div>
  );
};
