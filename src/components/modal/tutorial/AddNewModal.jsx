"use client";
import React from "react";
import { Button, Modal, Select } from "flowbite-react";
import { AiOutlineCloseCircle, AiOutlinePlusCircle } from "react-icons/ai";
import FormAddNew from "./FormAddNew";

export default function AddNewModal() {
  const [openModal, setOpenModal] = React.useState(undefined);
  const [modalSize, setModalSize] = React.useState("6xl");
  const props = { modalSize, openModal, setModalSize, setOpenModal };

  return (
    <>
      <button
        onClick={() => props.setOpenModal("size")}
        className="rounded-main px-5 max-sm:px-2 p-2.5 bg-black text-white  "
      >
        <AiOutlinePlusCircle className="inline text-2xl" />{" "}
        <span className="max-sm:hidden">Add new tutorial</span>
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
          <FormAddNew closeModal={() => props.setOpenModal(undefined)} />
        </div>
      </Modal>
    </>
  );
}
