"use client";

import Button from "@/components/Button";
import Modal from "@/components/modals/Modal";
import useConversations from "@/hooks/useConversation";
import { Dialog } from "@headlessui/react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { FC, useState } from "react";
import toast from "react-hot-toast";
import { FiAlertTriangle } from "react-icons/fi";
type ConfirmModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

const ConfirmModal: FC<ConfirmModalProps> = ({ isOpen, onClose }) => {
  const router = useRouter();
  const { conversationId } = useConversations();
  const [isLoading, setIsLoading] = useState(false);
  const onDelete = () => {
    setIsLoading(true);

    axios
      .delete(`/api/conversations/${conversationId}`)
      .then(() => {
        onClose();
        router.push("/conversations");
        window.location.reload();
        // router.refresh();
      })
      .catch(() => toast.error("에러가 발생했습니다."))
      .finally(() => setIsLoading(false));
  };
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="sm:flex sm:items-start">
        <div
          className={`mx-auto flex size-12 shrink-0 items-center justify-center rounded-full bg-red-100 sm:mx-0 sm:size-10`}
        >
          <FiAlertTriangle className="size-6 text-red-600" />
        </div>
        <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
          <Dialog.Title
            as="h3"
            className="text-base font-semibold leading-6 text-gray-900"
          >
            대화 삭제
          </Dialog.Title>
          <div className="mt-2">
            <p className="text-sm text-gray-500">
              이 대화를 삭제하시겠습니까? 이 작업을 취소할 수 있습니다.
            </p>
          </div>
        </div>
      </div>
      <div className="mt-5 sm:mt-4 sm:flex sm:flex-row-reverse">
        <Button disabled={isLoading} danger onClick={onDelete}>
          삭제
        </Button>
        <Button disabled={isLoading} secondary onClick={onClose}>
          취소
        </Button>
      </div>
    </Modal>
  );
};

export default ConfirmModal;
