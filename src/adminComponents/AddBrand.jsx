import React from 'react'
import { useState, useRef } from 'react';
import { useDispatch } from 'react-redux';
import CustomSpinner from "./CustomSpinner";
import { toast } from "react-toastify";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { createBrand } from '@/redux/brandSlice';
import { useCallback } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { supportedFormats } from "@/constant/constant";
import { compressImage } from './CompressImage';
import { X } from "lucide-react";
import { MAX_FILE_SIZE } from "@/constant/constant";

const AddBrand = ({ isOpen, onClose }) => {
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [brand, setBrand] = useState("");
    const [selectedImages, setSelectedImages] = useState([]);
    const [sizeWarning, setSizeWarning] = useState("");
    const fileInputRef = useRef(null);


     // Handle Product Images
  const handleFileChange = async (e) => {
    setLoading(true); // Set loading to true when starting image compression
    const files = Array.from(e.currentTarget.files);

    // Check if total selected images exceed the limit (10)
    if (selectedImages.length + files.length > 10) {
      setSizeWarning("You can only upload a maximum of 10 images.");
      setLoading(false);
      return;
    }

    const newImages = [];
    let warnings = [];

    for (let file of files) {
      if (!supportedFormats.includes(file.type)) {
        warnings.push(`${file.name} is not a supported format. Please upload jpg, png, jpeg, or webp.`);
        continue;
      }

      try {
        const compressedImage = await compressImage(file);
        newImages.push(compressedImage);
      } catch (error) {
        warnings.push(`Failed to process ${file.name}: ${error.message}`);
      }
    }

    setSelectedImages(prevImages => [...prevImages, ...newImages]);
    setSizeWarning(warnings.length > 0 ? warnings.join(". ") : "");
    setLoading(false); // Set loading to false after compression is done

    if (fileInputRef.current) {
      fileInputRef.current.value = ""; // Reset file input
    }
  };


  const removeImage = (index) => {
    setSelectedImages(prevImages => {
      const newImages = [...prevImages];
      const removedImage = newImages[index];

      // Ensure the image exists before trying to access 'size'
      if (removedImage && removedImage.file) {
        URL.revokeObjectURL(removedImage.preview); // Revoke object URL

        // Remove the image from the array
        newImages.splice(index, 1);

        // Check if the removed image was causing a size warning
        if (removedImage.file.size > MAX_FILE_SIZE) {
          // Check if any remaining images exceed the size limit
          const hasOversizedImage = newImages.some(img => img.file.size > MAX_FILE_SIZE);

          // Clear the size warning if no images exceed the size limit
          if (!hasOversizedImage) {
            setSizeWarning("");
          }
        }
      }

      return newImages;
    });
  };


    const handleSubmit = useCallback(
        async (event) => {
            event.preventDefault();

            // const { file: compressedFile } = await compressImage(bannerImage);

            const formData = new FormData();
            selectedImages.forEach((img) => {
                formData.append("brandImages", img.file);
              });

            setLoading(true);
            // Dispatch the createBanner action
            dispatch(createBrand(formData))
                .unwrap() // Ensure we can handle promise resolution properly
                .then(() => {
                    toast.success("Brand uploaded successfully", { autoClose: 3000 });
                    onClose(); // Close the dialog after successful upload
                })
                .catch((error) => {
                    const errorMessage = error?.error || error?.message || "Failed to create brand";
                    toast.error(errorMessage);
                })
                .finally(() => {
                    setLoading(false);
                });
        },
        [dispatch, selectedImages, onClose]
    );

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Add Brands</DialogTitle>
                </DialogHeader>
                <form onSubmit={handleSubmit}>
                    <div className="space-y-4">
                        <div className="col-span-1">
                            <label className="block text-sm font-medium text-gray-700 pb-2">Brand Images</label>
                            <Input
                                type="file"
                                onChange={handleFileChange}
                                multiple
                                className="mt-1 block w-full"
                                ref={fileInputRef}
                            />
                            {sizeWarning && (
                                <div className="text-red-500 mt-1">{sizeWarning}</div>
                            )}
                            <div className="mt-2 flex flex-wrap gap-2">
                                {selectedImages.map((img, index) => (
                                    <div key={index} className="relative">
                                        <img src={img.preview} alt={`Preview ${index + 1}`} className="w-20 h-20 object-cover" />
                                        <button
                                            type="button"
                                            onClick={() => removeImage(index)}
                                            className="absolute top-0 right-0 bg-red-500 text-white rounded-full p-1"
                                        >
                                            <X size={16} />
                                        </button>
                                    </div>
                                ))}
                            </div>
                        </div>
                        {error && <p className="text-red-500">{error}</p>}
                    </div>
                    <DialogFooter className="mt-4">
                        <Button type="submit" disabled={loading || !selectedImages || error}>
                            {loading ? <CustomSpinner /> : "Upload"}
                        </Button>
                        <Button type="button" variant="secondary" onClick={onClose}>
                            Cancel
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    )
}

export default AddBrand