import React from "react";

export default function Upload() {
  const handleFileUpload = async () => {
    const fileInput = document.createElement("input");
    fileInput.type = "file";
    fileInput.accept = "application/pdf";
    fileInput.click();

    fileInput.addEventListener("change", async (event) => {
      const file = event.target.files[0];
      const formData = new FormData();
      formData.append("file", file); // Change key to "file"

      try {
        const response = await fetch("http://127.0.0.1:8000/upload-pdf/", {
          method: "POST",
          body: formData,
        });

        if (response.ok) {
          // Handle successful upload
          console.log("PDF uploaded successfully");
        } else {
          // Handle failed upload
          console.error("Failed to upload PDF");
        }
      } catch (error) {
        console.error("Error uploading PDF:", error);
      }
    });
  };

  return (
    <div id="upload">
      <div id="logo"></div>
      {/* Attach click event handler to the button */}
      <button id="uploadbutton" onClick={handleFileUpload}>
        Upload PDF
      </button>
    </div>
  );
}
