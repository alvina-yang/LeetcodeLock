// src/components/ClientProvider.tsx
"use client";

import React from "react";
import { ModalProvider, useModal } from "../context/ModalContext";
import { WebSocketHandler } from "./WebSocketHandler";
import Modal from "@/components/modal";

const ClientProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <ModalProvider>
      <WebSocketHandler />
      {children}
      <GlobalModal />
    </ModalProvider>
  );
};

const GlobalModal = () => {
  const { isVisible, hideModal } = useModal();
  return <Modal isVisible={isVisible} onClose={hideModal} />;
};

export default ClientProvider;
