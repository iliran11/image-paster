import React from "react";

const useImagePaster = () => {
  const [imageString, setImageString] = React.useState<null | string>(null);

  const onFileUpload = (e: any) => {
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.onloadend = function () {
      if (reader.result) {
        const base64String = reader.result as string;
        setImageString(base64String);
      }
    };

    reader.readAsDataURL(file);
  };
  const handleSend = (artist: string, id: string) => {
    if (!imageString) throw new Error("no image");

    fetch("/api/image", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        imageBase64: imageString,
        artist,
        id,
      }),
    });
  };

  const handlePaste = async (e: any) => {
    let items = e.clipboardData.items;
    for (let index in items) {
      let item = items[index];
      if (item.kind === "file") {
        let blob = item.getAsFile();
        const reader = new FileReader();
        reader.readAsDataURL(blob);
        reader.onloadend = () => {
          if (reader) {
            setImageString(reader.result as string);
          }
        };
      }
    }
  };
  React.useEffect(() => {
    document.addEventListener("paste", (e) => {
      handlePaste(e);
      // You'll need to call `handlePaste` from here. This setup is non-ideal in a React component.
    });
  }, []);
  return { handleSend, imageString, onFileUpload };
};

export default useImagePaster;
