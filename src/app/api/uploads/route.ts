import { writeFile, mkdir } from "fs/promises";
import { NextResponse } from "next/server";
import path from "path";
import { existsSync } from "fs";

export async function POST(request: Request) {
  const data = await request.formData();

  const files = data.getAll("file") as File[]; // Obtener todos los archivos
  console.log("Archivos recibidos:", files);

  if (!files || files.length === 0) {
    return NextResponse.json(
      { message: "No files or invalid files" },
      { status: 400 }
    );
  }

  // Ruta del directorio de carga
  const uploadDir = path.join(process.cwd(), "public/uploads");

  // Crear el directorio si no existe
  if (!existsSync(uploadDir)) {
    console.log("Directorio no existe, creando:", uploadDir);
    await mkdir(uploadDir, { recursive: true });
  }

  try {
    // Procesar y guardar cada archivo
    await Promise.all(
      files.map(async (file) => {
        if (file instanceof File) {
          const bytes = await file.arrayBuffer();
          const buffer = Buffer.from(bytes);

          const filePath = path.join(uploadDir, file.name);
          console.log("Guardando archivo en:", filePath);

          await writeFile(filePath, buffer);
        }
      })
    );

    return NextResponse.json({ message: "Files uploaded successfully" });
  } catch (error) {
    console.error("Error al guardar los archivos:", error);
    return NextResponse.json(
      { message: "Error uploading files", error },
      { status: 500 }
    );
  }
}
