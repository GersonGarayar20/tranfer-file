import FilesTable from "@/components/files-table";
import LoginForm from "@/components/ui/login-form";
import React from "react";

export default function page() {
  return (
    <div className="py-8">
      <h1>Admin</h1>
      <p>Bienvenido a la página de administración</p>
      <section className="w-96">
        <LoginForm />
      </section>
      <section>
        <FilesTable />
      </section>
    </div>
  );
}
