"use client";

import Modal from "@/components/modals/Modal";
import Image from "next/image";
import { FC } from "react";

type ImageModalProps = {
  src?: string | null;
  isOpen: boolean;
  onClose: () => void;
};

const ImageModal: FC<ImageModalProps> = ({ src, isOpen, onClose }) => {
  if (!src) {
    return null;
  }
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="size-80">
        <Image className="object-cover" fill alt="Image" src={src} />
      </div>
    </Modal>
  );
};

export default ImageModal;
