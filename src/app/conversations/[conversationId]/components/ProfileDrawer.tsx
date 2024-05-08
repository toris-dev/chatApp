"use client";

import Avatar from "@/components/Avatar";
import AvatarGroup from "@/components/AvatarGroup";
import useActiveList from "@/hooks/useActiveList";
import useOtherUser from "@/hooks/useOtheruser";
import { Dialog, Transition } from "@headlessui/react";
import { Conversation, User } from "@prisma/client";
import { format } from "date-fns";
import { FC, Fragment, useMemo, useState } from "react";
import { IoClose, IoTrash } from "react-icons/io5";
import ConfirmModal from "./ConfirmModal";
type ProfileDrawerProps = {
  isOpen: boolean;
  onClose: () => void;
  data: Conversation & {
    users: User[];
  };
};

const ProfileDrawer: FC<ProfileDrawerProps> = ({ isOpen, onClose, data }) => {
  const [confirmOpen, setConfirmOpen] = useState(false);
  const otherUser = useOtherUser(data);
  const title = data.name || otherUser.name;

  const joinedDate = format(new Date(otherUser.createdAt), "PP");
  const { members } = useActiveList();
  const isActive = members.indexOf(otherUser?.email!) !== -1;

  const statusText = useMemo(() => {
    if (data.isGroup) {
      return `${data.users.length} members`;
    }
    return isActive ? "Active" : "Offline";
  }, [data, isActive]);
  return (
    <>
      <ConfirmModal
        isOpen={confirmOpen}
        onClose={() => setConfirmOpen(false)}
      />

      <Transition.Root show={isOpen} as={Fragment}>
        <Dialog as="div" className={`relative z-50`} onClose={onClose}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-500"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-500"
            leaveFrom="opacity-100"
            leaveTo="opacity-100"
          >
            <div className="fixed inset-0 bg-black bg-opacity-[0.4]" />
          </Transition.Child>
          <div className="fixed inset-0 overflow-hidden">
            <div className="absolute inset-0 overflow-hidden">
              <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
                <Transition.Child
                  as={Fragment}
                  enter="ease-out duration-500 transform transition"
                  enterFrom="translate-x-full"
                  enterTo="translate-x-0"
                  leave="ease-out duration-500 transform transition"
                  leaveFrom="translate-x-0"
                  leaveTo="translate-x-full"
                >
                  <Dialog.Panel className="pointer-events-auto w-screen max-w-md">
                    <div className="flex h-full flex-col overflow-y-scroll bg-white py-6 shadow-xl">
                      <div className="px-4 sm:px-6">
                        <div className="flex items-start justify-end">
                          <div className="ml-3 flex h-7 items-center">
                            <button
                              type="button"
                              onClick={onClose}
                              className={`rounded-md bg-white text-gray-400 hover:text-gray-500 focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2`}
                            >
                              <span className="sr-only">Close Panel</span>
                              <IoClose size={24} />
                            </button>
                          </div>
                        </div>
                      </div>
                      <div className="relative mt-6 flex-1 px-4 sm:px-6">
                        <div className="flex flex-col items-center">
                          <div className="mb-2">
                            {data.isGroup ? (
                              <AvatarGroup users={data.users} />
                            ) : (
                              <Avatar user={otherUser} />
                            )}
                          </div>
                          <div>{title}</div>
                          <div className="text-sm text-gray-500">
                            {statusText}
                          </div>
                          <div className="my-8 flex gap-10">
                            <div
                              className="flex cursor-pointer flex-col items-center gap-3 hover:opacity-75"
                              onClick={() => setConfirmOpen(true)}
                            >
                              <div className="flex size-10 items-center justify-center rounded-full bg-neutral-100">
                                <IoTrash />
                              </div>
                              <div className="text-sm font-light text-neutral-600">
                                Delete
                              </div>
                            </div>
                          </div>
                          <div className="w-full py-5 sm:px-0 sm:pt-0">
                            <dl className="space-y-8 px-4 sm:space-y-6 sm:px-6">
                              {data.isGroup && (
                                <div>
                                  <dt className="text-sm font-medium text-gray-500 sm:w-40 sm:shrink-0">
                                    Emails
                                  </dt>
                                  <dd className="mt-1 text-sm text-gray-900 sm:col-span-2">
                                    {data.users
                                      .map((user) => user.email)
                                      .join(", ")}
                                  </dd>
                                </div>
                              )}
                              {!data.isGroup && (
                                <div>
                                  <dt className="text-sm font-medium text-gray-500 sm:w-40 sm:shrink-0">
                                    Emails
                                  </dt>
                                  <dd className="mt-1 text-sm text-gray-900 sm:col-span-2">
                                    {otherUser.email}
                                  </dd>
                                </div>
                              )}
                              {!data.isGroup && (
                                <>
                                  <hr />
                                  <div>
                                    <dt className="text-sm font-medium text-gray-500 sm:w-40 sm:shrink-0">
                                      Joined
                                    </dt>
                                    <dd className="mt-1 text-sm text-gray-900 sm:col-span-2">
                                      <time dateTime={joinedDate}>
                                        {joinedDate}
                                      </time>
                                    </dd>
                                  </div>
                                </>
                              )}
                            </dl>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Dialog.Panel>
                </Transition.Child>
              </div>
            </div>
          </div>
        </Dialog>
      </Transition.Root>
    </>
  );
};

export default ProfileDrawer;
