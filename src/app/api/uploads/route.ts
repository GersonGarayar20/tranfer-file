import { writeFile } from 'fs/promises';
import { NextResponse } from 'next/server';
import path from 'path';

export async function POST(request: Request) {
  const data = await request.formData();

  const file = data.get("file") as File ; // Asegúrate de que sea del tipo correcto
  console.log("ver si llegó el archivo", file);

  if (!file || typeof file === "string") {
    return NextResponse.json(
      { message: "No file or invalid file" },
      { status: 400 }
    );
  }

  // Leer el contenido del archivo usando su Blob
  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);

  // Guardar el archivo en una ruta específica
  const filePath = path.join(process.cwd(), "public", file.name);
  console.log("Guardando en:", filePath);

  try {
    await writeFile(filePath, buffer);
    return NextResponse.json({ message: "File uploaded successfully" });
  } catch (error) {
    console.error("Error al guardar el archivo:", error);
    return NextResponse.json(
      { message: "Error saving file", error: error.message },
      { status: 500 }
    );
  }
}
