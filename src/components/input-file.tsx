"use client";

import { upload } from "@/lib/services/upload";
import React, { useState } from "react";
import {
  CirclePlusIcon,
  InfoIcon,
  ArrowDownToLineIcon,
  TrashIcon,
  FileIcon,
} from "lucide-react";

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
    <section className="p-6 w-full">
      <h2 className="text-2xl font-semibold mb-6">Subir archivos</h2>
      <div className="relative w-full h-96 flex flex-col justify-center items-center p-4">
        <div
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          className={`absolute inset-0 border-2 border-dashed border-neutral-200 p-4 rounded-lg transition-all cursor-pointer hover:border-blue-200 ${
            dragging ? "border-blue-200 bg-blue-200/10" : ""
          }`}
          onClick={() => inputFileRef.current?.click()}
        ></div>

        <div className="flex flex-col justify-center items-center gap-3 text-neutral-500">
          <CirclePlusIcon className="size-8" />
          <p>Arrastre y suelte o haga clic para elegir archivos</p>

          <div className="flex items-center gap-1">
            <InfoIcon className="size-4" />
            <p className="text-sm font-semibold">
              Tamaño máximo de archivo: 10 MB
            </p>
          </div>
        </div>

        <input
          type="file"
          accept="image/*,.pdf,.doc,.docx,.txt"
          multiple // Permitir múltiples archivos
          onChange={handleInputChange}
          className="hidden"
          ref={inputFileRef}
        />
      </div>

      <footer>
        {uploadedFiles.length > 0 && (
          <div className="flex flex-col gap-2 mt-6">
            <ul>
              {uploadedFiles.map((file, index) => (
                <li
                  key={index}
                  className="flex items-center gap-3 border p-3 rounded-lg"
                >
                  <div className="p-2">
                    <FileIcon className="size-6 text-orange-500" />
                  </div>
                  <div className="flex-1">
                    <p>{file.name}</p>
                    <span className="text-sm text-neutral-500">
                      .{file.type.split("/")[1]} | {file.size} bytes
                    </span>
                  </div>
                  <footer className="flex gap-2 items-center text-neutral-500">
                    <button className="p-2 rounded-full border hover:text-blue-500">
                      <ArrowDownToLineIcon className="size-4" />
                    </button>
                    <button className="p-2 rounded-full border hover:text-red-500">
                      <TrashIcon className="size-4" />
                    </button>
                  </footer>
                </li>
              ))}
            </ul>
          </div>
        )}
      </footer>
    </section>
  );
}
