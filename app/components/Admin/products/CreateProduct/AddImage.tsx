"use client";
import { customerInputsStyles } from "@/app/utils/styles";
import Image from "next/image";
import toast from "react-hot-toast";

const AddImage = ({ images, setImages }: any) => {
  const handleFileChange = (e: any) => {
    const files = Array.from(e.target.files);
    if (images[0]?.url) {
      setImages([]);
    }

    // Check if more than 3 files are selected
    if (files.length > 3) {
      toast.error("You can only select up to 3 images.");
      return;
    }

    files.forEach((file: any) => {
      const reader = new FileReader();

      reader.onload = () => {
        if (reader.readyState === 2) {
          setImages((oldPrev: any) => [...oldPrev, reader.result]);
        }
      };

      reader.readAsDataURL(file);
    });
  };

  return (
    <div className=" w-full  p-4 md:p-7 mx-auto rounded text-white border shadow-lg">
      <form>
        <div className="w-full flex justify-between items-center">
          <h2 className="mb-3 text-md font-medium text-secondary">
            Upload Product Images
          </h2>
          <h2
            className="mb-3 text-sm font-medium  cursor-pointer underline mr-4 text-red-300"
            onClick={() => setImages([])}
          >
            Clear
          </h2>
        </div>

        <div className="mb-4 flex flex-col md:flex-row">
          <div className="w-full">
            <input
              className={customerInputsStyles}
              type="file"
              id="formFile"
              multiple
              onChange={handleFileChange}
            />
          </div>
        </div>

        <div className="grid grid-cols-6 gap-2 my-5">
          {images?.map((img: any, index: number) => (
            <Image
              src={img.url ? img.url : img}
              key={index}
              alt="Preview"
              className="col-span-1 object-contain shadow rounded p-2 h-full w-full"
              width="50"
              height="50"
            />
          ))}
        </div>
      </form>
    </div>
  );
};

export default AddImage;
