"use client";

import { useEffect } from "react";
import clarity from "@microsoft/clarity";

const projectId = "w0mt7h9j10";

export default function Clarity() {
  useEffect(() => {
    try {
      clarity.init(projectId);
    } catch (e) {
      console.error("Clarity init failed", e);
    }
  }, []);

  return null;
}
