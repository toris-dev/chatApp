import AuthForm from "@/app/(home)/components/AuthForm";

const HomePage = () => {
  return (
    <div
      className={`flex min-h-full flex-col justify-center bg-gray-100 py-12 sm:px-6 lg:px-8`}
    >
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">
          로그인 & 회원가입
        </h2>
      </div>
      <AuthForm />
    </div>
  );
};

export default HomePage;
