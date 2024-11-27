"use client";
import Page from "@/components/layout/page";
import { Form, FormField, FormItem, FormLabel } from "@/components/ui/form";
import { loginSchema, LoginSchema } from "@/schemas/login.schema";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import useAuth from "@/hooks/use-auth";
export default function LoginPage() {

  const form = useForm<LoginSchema>({
    resolver: zodResolver(loginSchema),
  });
  const { loginMutation } = useAuth();
  const onSubmit = async (data: LoginSchema) => {
    await loginMutation.mutateAsync(data);
  };

  // if (status == "authenticated") {
  //   return push("/dashboard");
  // }
  return (
    <Page>
      <div className="flex justify-center h-screen items-center">
        <Form {...form}>
          <form
            className="flex flex-col gap-4 w-1/2 border rounded-lg p-4"
            onSubmit={form.handleSubmit(onSubmit)}
          >
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <Input {...field} />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <Input type="password" {...field} />
                </FormItem>
              )}
            />
            <div className="w-full flex justify-end">
              <Button>Login</Button>
            </div>
          </form>
        </Form>
      </div>
    </Page>
  );
}
