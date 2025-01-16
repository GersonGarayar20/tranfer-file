import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "../ui/button";

export default function FilesTable() {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Nombre</TableHead>
          <TableHead className="w-32 text-center">Accion</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        <TableRow>
          <TableCell>Image.png</TableCell>
          <TableCell>
            <Button>Descargar</Button>
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell>Image.png</TableCell>
          <TableCell>
            <Button>Descargar</Button>
          </TableCell>
        </TableRow>
      </TableBody>
    </Table>
  );
}
