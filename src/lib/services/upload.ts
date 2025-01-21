export const upload = async (files: File[]) => {
  files.forEach(async (file) => {
    const formData = new FormData();
    formData.append("file", file);
    const res = await fetch("/api/uploads", {
      method: "POST",
      body: formData,
    });
    console.log(res);
  });
};
