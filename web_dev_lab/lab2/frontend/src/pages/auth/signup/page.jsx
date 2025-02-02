import SignupForm from "@/components/SignupForm"

export default function Signup() {
  return (
    (<div className="w-full max-w-md">
      <h1 className="text-4xl font-bold mb-8 text-center">Create an Account</h1>
      <SignupForm />
    </div>)
  );
}

