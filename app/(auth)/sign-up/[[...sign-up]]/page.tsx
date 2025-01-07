import { SignUp } from "@clerk/nextjs";

export default function SignUpPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <SignUp afterSignUpUrl="/dashboard" afterSignInUrl="/dashboard" signInUrl="/sign-in" />
    </div>
  );
}
