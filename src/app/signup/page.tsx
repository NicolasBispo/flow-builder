"use client";
import Page from "@/components/layout/page";
import { Form, FormField, FormItem, FormLabel } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useMutation } from "@tanstack/react-query";
import { signupSchema, SignupSchema } from "@/schemas/signup.schema";
import { signupRequest } from "@/requests/auth";
export default function LoginPage() {
  const form = useForm<SignupSchema>({
    resolver: zodResolver(signupSchema),
  });

  const signupMutation = useMutation({
    mutationKey: ["login"],
    mutationFn: async (data: SignupSchema) => {
      return await signupRequest(data);
    },
    onSuccess: (data) => {
      console.log("data", data);
    },
    onError: (error) => {
      console.log("error", error);
    },
  });

  const onSubmit = async (data: SignupSchema) => {
    await signupMutation.mutateAsync(data);
  };
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
              <Button>Signup</Button>
            </div>
          </form>
        </Form>
      </div>
    </Page>
  );
}
