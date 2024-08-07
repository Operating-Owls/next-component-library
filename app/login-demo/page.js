import LoginForm from "@/components/login/LoginForm";

const LoginPage = () => {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center">
      <a href="/" className="text-blue-500 hover:underline mb-4">Back to home</a>
      <LoginForm />
    </div>
  );
};

export default LoginPage;
