"use client";
import React, { useEffect, useState } from "react";
import { AiOutlineCloseCircle, AiOutlinePlusCircle } from "react-icons/ai";
import * as Yup from "yup";
import { Button, Modal, Select } from "flowbite-react";
import FormCreateNew from "./FormCreateNew";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import FormNew from "./NewForm";


const CreateNew = () => {
  const [openModal, setOpenModal] = React.useState(undefined);
  const [modalSize, setModalSize] = React.useState("6xl");
  const props = { modalSize, openModal, setModalSize, setOpenModal };


  return (
    <>
      <button
        onClick={() => props.setOpenModal("size")}
        className="rounded-main px-5 max-sm:px-2 p-2.5 bg-black text-white  dark:bg-primary"
      >
        <AiOutlinePlusCircle className="inline text-2xl" />{" "}
        <span className="max-sm:hidden">Add new User</span>
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
          <h2 className="text-center text-2xl mt-10 mb-5  text-light dark:text-white font-semibold">
            Create User
          </h2>
          {/* <FormCreateNew closeModal={() => props.setOpenModal(undefined)}/>
           */}
           <FormNew closeModal={() => props.setOpenModal(undefined)}/>
        </div>
      </Modal>
    </>
  );
};

export default CreateNew;
