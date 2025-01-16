"use client";

import { upload } from "@/lib/services/upload";
import React, { useState } from "react";

export default function InputFile() {
  const [dragging, setDragging] = useState(false); // Estado para el estilo del área de arrastre
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]); // Lista de archivos subidos
  const inputFileRef = React.useRef<HTMLInputElement>(null);

  const handleFileUpload = async (files: FileList | null) => {
    if (files) {
      const allowedTypes = [
        "image/jpeg",
        "image/png",
        "image/gif",
        "application/pdf",
        "application/msword",
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
        "text/plain",
      ];

      const validFiles = Array.from(files).filter((file) =>
        allowedTypes.includes(file.type)
      );

      if (validFiles.length === 0) {
        alert(
          "Ninguno de los archivos tiene un formato válido. Solo se permiten imágenes y documentos."
        );
        return;
      }

      setUploadedFiles((prevFiles) => [...prevFiles, ...validFiles]);
      console.log("Archivos subidos:", validFiles);
      // Aquí puedes realizar acciones adicionales, como subir los archivos a un servidor
      const res = await upload(validFiles);
      console.log(res);
    }
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    handleFileUpload(event.target.files);
  };

  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault(); // Evita que el navegador abra el archivo
    setDragging(true);
  };

  const handleDragLeave = () => {
    setDragging(false);
  };

  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setDragging(false);
    handleFileUpload(event.dataTransfer.files);
  };

  return (
    <div className="relative w-full h-96 flex flex-col justify-center items-center p-4">
      <div
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        className={`absolute inset-0 border-2 border-dashed border-gray-300 p-4 rounded-lg transition-all cursor-pointer hover:border-secondary ${
          dragging ? "border-secondary" : ""
        }`}
        onClick={() => inputFileRef.current?.click()}
      ></div>

      <p className="z-10 text-center">
        {dragging
          ? "Suelta los archivos aquí"
          : "Arrastra archivos aquí o haz clic para seleccionar"}
      </p>

      <input
        type="file"
        accept="image/*,.pdf,.doc,.docx,.txt"
        multiple // Permitir múltiples archivos
        onChange={handleInputChange}
        className="hidden"
        ref={inputFileRef}
      />

      {uploadedFiles.length > 0 && (
        <div className="mt-4 text-gray-600">
          <p>Archivos subidos:</p>
          <ul>
            {uploadedFiles.map((file, index) => (
              <li key={index}>{file.name}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
