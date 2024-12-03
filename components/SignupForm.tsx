"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { signupUser } from "@/app/actions/authActions";

// Zod schema for validation
const signupSchema = z.object({
  email: z.string().email("Invalid email address"),
  username: z.string().min(3, "Username must be at least 3 characters"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

type SignupFormData = z.infer<typeof signupSchema>;

export default function SignupForm() {
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignupFormData>({
    resolver: zodResolver(signupSchema),
  });

  const onSubmit = async (data: SignupFormData) => {
    setLoading(true);
    setMessage("");

    const result = await signupUser(data);

    setMessage(result.message);
    setLoading(false);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div>
        <label
          htmlFor="email"
          className="block text-sm font-medium text-gray-700"
        >
          Email
        </label>
        <Input
          id="email"
          {...register("email")}
          placeholder="Enter your email"
          className="w-full"
        />
        {errors.email && (
          <p className="text-red-500 text-sm">{errors.email.message}</p>
        )}
      </div>
      <div>
        <label
          htmlFor="username"
          className="block text-sm font-medium text-gray-700"
        >
          Username
        </label>
        <Input
          id="username"
          {...register("username")}
          placeholder="Choose a username"
          className="w-full"
        />
        {errors.username && (
          <p className="text-red-500 text-sm">{errors.username.message}</p>
        )}
      </div>
      <div>
        <label
          htmlFor="password"
          className="block text-sm font-medium text-gray-700"
        >
          Password
        </label>
        <Input
          id="password"
          type="password"
          {...register("password")}
          placeholder="Create a password"
          className="w-full"
        />
        {errors.password && (
          <p className="text-red-500 text-sm">{errors.password.message}</p>
        )}
      </div>
      {message && (
        <p
          className={`text-center ${
            message.includes("successfully") ? "text-green-500" : "text-red-500"
          }`}
        >
          {message}
        </p>
      )}
      <Button type="submit" className="w-full" disabled={loading}>
        {loading ? "Loading..." : "Sign Up"}
      </Button>
    </form>
  );
}
