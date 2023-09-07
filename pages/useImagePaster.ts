import React from "react";

const useImagePaster = () => {
  const [imageString, setImageString] = React.useState<null | string>(null);
  const handleSend = () => {
    if (!imageString) throw new Error("no image");

    fetch("/api/image", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        imageBase64: imageString,
      }),
    });
  };

  const handlePaste = async (e) => {
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
  return { handleSend, imageString };
};

export default useImagePaster;
