"use client";

import AuthSocialButton from "@/app/(home)/components/AuthSocialButton";
import Button from "@/components/Button";
import Input from "@/components/inputs/Input";
import axios from "axios";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { FaGoogle } from "react-icons/fa";
import { RiGithubFill } from "react-icons/ri";
type Variant = "LOGIN" | "REGISTER";

const AuthForm = () => {
  const session = useSession();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [variant, setVariant] = useState<Variant>("LOGIN");
  useEffect(() => {
    if (session?.status === "authenticated") {
      router.push("conversations");
    }
  }, [session?.status, router]);

  const toggleVariant = () => {
    if (variant === "LOGIN") {
      setVariant("REGISTER");
    } else {
      setVariant("LOGIN");
    }
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    setIsLoading(true);

    if (variant === "REGISTER") {
      axios
        .post("/api/register", data)
        .then(() =>
          signIn("credentials", {
            ...data,
            redirect: false,
          }).then((callback) => {
            if (callback?.error) {
              toast.error("Invalid credentials");
            }

            if (callback?.ok) {
              router.push("/conversations");
            }
          })
        )
        .catch(() => toast.error("에러가 발생했습니다."))
        .finally(() => setIsLoading(false));
    }

    if (variant === "LOGIN") {
      signIn("credentials", {
        ...data,
        redirect: false,
      })
        .then((callback) => {
          if (callback?.error) {
            toast.error("Invalid credentials");
          }

          if (callback?.ok) {
            router.push("/conversations");
          }
        })
        .finally(() => setIsLoading(false));
    }
  };

  const socialAction = (action: string) => {
    setIsLoading(true);
    signIn(action, { redirect: false })
      .then((callback) => {
        if (callback?.error) {
          toast.error("Invalid credentials");
        }

        if (callback?.ok) {
          router.push("/conversations");
        }
      })
      .finally(() => setIsLoading(false));
  };
  return (
    <div
      className={`mt-8 sm:mx-auto
      sm:w-full sm:max-w-md
      `}
    >
      <div className={`ms:px-10 bg-white px-4 py-8 shadow sm:rounded-lg`}>
        <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
          {variant === "REGISTER" && (
            <Input
              disabled={isLoading}
              register={register}
              errors={errors}
              required
              id="name"
              label="이름"
            />
          )}
          <Input
            disabled={isLoading}
            register={register}
            errors={errors}
            required
            id="email"
            label="이메일"
            type="email"
          />
          <Input
            disabled={isLoading}
            register={register}
            errors={errors}
            required
            id="password"
            label="비밀번호"
            type="password"
          />
          <div>
            <Button disabled={isLoading} fullWidth type="submit">
              {variant === "LOGIN" ? "로그인" : "회원가입"}
            </Button>
          </div>
        </form>
        <div className="mt-6">
          <div className="relative">
            <div className={`absolute inset-0 flex items-center`}>
              <div className={`w-full border-t border-gray-300`} />
            </div>
          </div>
          <div className={`relative flex justify-center text-sm`}>
            <span className={`bg-white px-2 text-gray-500`}>소셜 로그인</span>
          </div>
          <div className="mt-6 flex gap-2">
            <AuthSocialButton
              icon={RiGithubFill}
              onClick={() => socialAction("github")}
            />
            <AuthSocialButton
              icon={FaGoogle}
              onClick={() => socialAction("google")}
            />
          </div>
          <div
            className={`mt-6 flex justify-center gap-2 px-2 text-sm text-gray-500`}
          >
            <div>
              {variant === "LOGIN"
                ? "메신저를 처음 사용하시나요?"
                : "이미 계정이 있나요?"}
            </div>
            <div className={`cursor-pointer underline`} onClick={toggleVariant}>
              {variant === "LOGIN" ? "계정 만들기" : "로그인하기"}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthForm;
