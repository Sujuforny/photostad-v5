"use client";
import React from "react";
import { Button, Modal, Select } from "flowbite-react";
import { AiOutlineCloseCircle, AiOutlinePlusCircle } from "react-icons/ai";
import UpdateForm from "./UpdateForm";
import Image from "next/image";

export default function UpdateModal({ id }) {
  const [openModal, setOpenModal] = React.useState(undefined);
  const [modalSize, setModalSize] = React.useState("6xl");
  const props = { modalSize, openModal, setModalSize, setOpenModal };

  return (
    <>
      <button
        onClick={() => props.setOpenModal("size")}
        className="rounded-main p-2.5  text-white  "
      >
        <Image
          src={"/assets/icons/edit.svg"}
          width={23}
          height={23}
          alt="edit icon"
          className="dark:invert"
        />
      </button>
      <Modal
        show={props.openModal === "size"}
        size={props.modalSize}
        onClose={() => props.setOpenModal(undefined)}
      >
        <button
          className="absolute top-2 right-2 bg-gray-300 rounded-full p-1"
          onClick={() => props.setOpenModal(undefined)}
        >
          <AiOutlineCloseCircle className="text-3xl" />
        </button>

        <div className="p-5 rounded-main dark:bg-secondary bg-white">
          {/* <FormAddTTR closeModal={() => props.setOpenModal(undefined)} /> */}
          <UpdateForm id={id} closeModal={() => props.setOpenModal(undefined)}/>
        </div>
      </Modal>
    </>
  );
}
