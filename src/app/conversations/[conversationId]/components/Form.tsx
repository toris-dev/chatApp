"use client";

import useConversations from "@/hooks/useConversation";
import axios from "axios";
import { CldUploadButton } from "next-cloudinary";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { HiPaperAirplane } from "react-icons/hi";
import { HiMiniPhoto } from "react-icons/hi2";
import MessageInput from "./MessageInput";
const Form = () => {
  const { conversationId } = useConversations();
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      message: "",
    },
  });

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    setValue("messages", "");
    axios.post("/api/messages", {
      ...data,
      conversationId: conversationId,
    });
  };

  const handleUpload = (result: any) => {
    axios.post("/api/messages", {
      image: result.info.secure_url,
      conversationId: conversationId,
    });
  };
  return (
    <div
      className={`flex w-full items-center gap-2 border-t bg-white p-4 lg:gap-4`}
    >
      <CldUploadButton
        options={{ maxFiles: 1 }}
        onUploadAdded={handleUpload}
        uploadPreset={process.env.NEXT_PUBLIC_CLOUDENARY_CLOUD_PRESET}
      >
        <HiMiniPhoto />
      </CldUploadButton>
      <form
        className="flex w-full items-center gap-2 lg:gap-4"
        onSubmit={onSubmit}
      >
        <MessageInput
          id="message"
          register={register}
          errors={errors}
          required
          placeholder="채팅을 입력해주세요"
        />
        <button
          type="submit"
          className={`cursor-pointer rounded-full bg-orange-500 p-2 transition hover:bg-orange-600`}
        >
          <HiPaperAirplane size={18} className="text-white" />
        </button>
      </form>
    </div>
  );
};

export default Form;
