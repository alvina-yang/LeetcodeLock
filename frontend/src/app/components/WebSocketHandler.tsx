// src/components/WebSocketHandler.tsx
"use client";

import { useEffect } from "react";
import { useModal } from "../context/ModalContext";

export const WebSocketHandler: React.FC = () => {
  const { showModal } = useModal();

  useEffect(() => {
    const ws = new WebSocket("ws://localhost:6789"); 

    ws.onmessage = (event) => {
      const boolValue = event.data === "true";
      console.log(`Received boolValue: ${boolValue}`);
      if (!boolValue) {
        showModal(); // Trigger the modal when `bool` is false
      }
    };

    ws.onerror = (error) => {
      console.error("WebSocket error:", error);
    };

    return () => {
      ws.close(); // Clean up on component unmount
    };
  }, [showModal]);

  return null; // This component doesn't render anything
};
