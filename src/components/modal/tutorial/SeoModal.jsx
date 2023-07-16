"use client";
import React from "react";
import { Button, Modal, Select } from "flowbite-react";
import { AiOutlineCloseCircle, AiOutlinePlusCircle } from "react-icons/ai";
import Image from "next/image";
import { TbSeo } from "react-icons/tb";
import SeoForm from "./SeoForm";



export default function SeoModal({ id }) {
  const [openModal, setOpenModal] = React.useState(undefined);
  const [modalSize, setModalSize] = React.useState("6xl");
  const props = { modalSize, openModal, setModalSize, setOpenModal };

  console.log(id, "id");

  

  return (
    <>
      <button
        onClick={() => props.setOpenModal("size")}
        className="rounded-main p-2.5  text-white  "
      >
        <TbSeo className="text-[23px] text-black dark:text-white" />
      </button>
      {/* <Modal
      
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

        <Modal.Body className="bg-white dark:bg-secondary">
          <h1 className="font-semibold text-center text-[24px] my-10 dark:text-white">
            Search Engine Optimization
          </h1>

          <SeoForm id={id}/>

         
        </Modal.Body>
      </Modal> */}
    </>
  );
}
