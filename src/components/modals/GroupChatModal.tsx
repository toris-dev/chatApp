"use client";

import { User } from "@prisma/client";
import axios from "axios";
import { useRouter } from "next/navigation";
import { FC, useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import Button from "../Button";
import Input from "../inputs/Input";
import Select from "../inputs/Select";
import Modal from "./Modal";

type GroupChatModalProps = {
  users: User[];
  isOpen: boolean;
  onClose: () => void;
};

const GroupChatModal: FC<GroupChatModalProps> = ({
  isOpen,
  onClose,
  users,
}) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: { name: "", members: [] },
  });

  const members = watch("members");
  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    setIsLoading(true);
    axios
      .post("/api/conversations", { ...data, isGroup: true })
      .then(() => {
        router.refresh();
        onClose();
      })
      .catch((err) => toast.error("에러가 발생했습니다."))
      .finally(() => setIsLoading(false));
  };
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="space-y-12">
          <div className="border-b border-gray-900 pb-12">
            <h2 className="text-base font-semibold leading-7 text-gray-900">
              그룹 채팅 만들기
            </h2>
            <p className="mt-1 text-sm leading-6 text-gray-600">
              2명 이상의 사람들과 채팅을 만드세요.
            </p>
            <div className="mt-10 flex flex-col gap-y-8">
              <Input
                disabled={isLoading}
                label="Name"
                id="name"
                errors={errors}
                required
                register={register}
              />
              <Select
                disabled={isLoading}
                label="Members"
                options={users.map((user) => ({
                  value: user.id,
                  label: user.name,
                }))}
                onChange={(value) =>
                  setValue("members", value, {
                    shouldValidate: true,
                  })
                }
              />
            </div>
          </div>
        </div>
        <div className="mt-6 flex items-center justify-end gap-x-6">
          <Button
            disabled={isLoading}
            onClick={onClose}
            type="button"
            secondary
          >
            취소
          </Button>
          <Button disabled={isLoading} type="submit">
            생성
          </Button>
        </div>
      </form>
    </Modal>
  );
};

export default GroupChatModal;
