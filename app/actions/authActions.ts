import { signIn } from "next-auth/react";

export const signupUser = async (data: {
    email: string;
    username: string;
    password: string;
  }) => {
    try {
      const res = await fetch("/api/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
  
      if (res.ok) {
        return { success: true, message: "User created successfully! You can now log in." };
      } else {
        const error = await res.json();
        return { success: false, message: error.message || "Something went wrong!" };
      }
    } catch (err) {
      return { success: false, message: "Error: Could not connect to server." };
    }
  };
  

export const loginUser = async (email: string, password: string) => {
  const result = await signIn("credentials", {
    email,
    password,
    redirect: false, // Prevent automatic redirect
  });

  if (result?.error) {
    return { success: false, message: result.error || "Invalid email or password" };
  }

  return { success: true, message: "Login successful!" };
};