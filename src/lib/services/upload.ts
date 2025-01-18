export const upload = (files: File[]) => {
  const res = fetch("http://locahost:3000/api/uploads",{method:"POST", body:JSON.stringify({
    file:files
  })})
  console.log(files);
};
