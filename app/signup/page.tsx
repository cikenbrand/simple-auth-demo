import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import SignupForm from "@/components/SignupForm";

export default function SignupPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>Sign Up</CardTitle>
        </CardHeader>
        <CardContent>
          <SignupForm />
        </CardContent>
        <CardFooter>
          <p className="text-sm text-gray-500">
            Already have an account?{" "}
            <a href="/login" className="text-blue-500">
              Log in
            </a>
            .
          </p>
        </CardFooter>
      </Card>
    </div>
  );
}
