import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "../ui/button";


import fs from 'fs';
import path from 'path';
import React from 'react';

export default async function FilesTable() {
  // Función que obtiene los archivos de la carpeta public/upload
  const uploadDirectory = path.join(process.cwd(), 'public', 'uploads');
  
  // Leer los archivos del directorio
  const files = fs.readdirSync(uploadDirectory);

  return (
    <Table>
    <TableHeader>
      <TableRow>
        <TableHead>Nombre</TableHead>
        <TableHead className="w-32 text-center">Accion</TableHead>
      </TableRow>
    </TableHeader>
    <TableBody>
      {
         <TableRow>
         {files.map((file) => (
           <TableCell key={file} className="flex justify-between">
             <span className="mr-[10px]">{file}</span>
             <a
               href={`/uploads/${file}`}
               download
               className="px-[5px] py-[10px] bg-blue-500 text-white rounded-[5px]"
             >
               Descargar
             </a>
           </TableCell>
         ))}
       </TableRow>
      }
    </TableBody>
  </Table>
  );
}
