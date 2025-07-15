import { useState, useEffect, useCallback } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useDispatch, useSelector } from "react-redux";
import { createBanner } from "@/redux/bannerSlice"; // Import the createBanner action
import CustomSpinner from "./CustomSpinner";
import { toast } from "react-toastify";
import { supportedFormats, MAX_FILE_SIZE } from "@/constant/constant";
import { compressImage } from "./CompressImage";

const AddBanner = ({ isOpen, onClose }) => {
    const [bannerImage, setBannerImage] = useState(null);
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [url, setUrl] = useState("");

    const handleImageChange = (event) => {
        setError(null);
        const file = event.target.files[0];

        if (!supportedFormats.includes(file.type)) {
            setError(`Unsupported format. Please upload jpg, png, jpeg, or webp`);
            return;
        }

        setBannerImage(file);
    };

    const handleUrlChange = (event) => {
        setUrl(event.target.value);
    }

    const handleSubmit = useCallback(
       async (event) => {
            event.preventDefault();

            if (!bannerImage) {
                console.error("No image selected.");
                toast.error("Please select an image before uploading.");
                return;
            }

            // const { file: compressedFile } = await compressImage(bannerImage);

            const formData = new FormData();
            formData.append("bannerImage", bannerImage);
            formData.append("url", url);

            setLoading(true);
            // Dispatch the createBanner action
            dispatch(createBanner(formData))
                .unwrap() // Ensure we can handle promise resolution properly
                .then(() => {
                    toast.success("Banner uploaded successfully", { autoClose: 3000 });
                    onClose(); // Close the dialog after successful upload
                })
                .catch((error) => {
                    const errorMessage = error?.error || error?.message || "Failed to create banner";
                    toast.error(errorMessage);
                })
                .finally(() => {
                    setLoading(false);
                });
        },
        [dispatch, bannerImage, url, onClose]
    );


    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Add a New Banner</DialogTitle>
                </DialogHeader>
                <form onSubmit={handleSubmit}>
                    <div className="space-y-4 mb-2">
                        <Input type="file" onChange={handleImageChange} accept="image/*" />
                        {error && <p className="text-red-500">{error}</p>}
                    </div>
                    <div className="space-y-2">
                        <label htmlFor="url" className="mt-2">Product URL</label>
                        <Input type="text" onChange={handleUrlChange} placeHolder="Enter product URL"/>
                        {error && <p className="text-red-500">{error}</p>}
                    </div>
                    <DialogFooter className="mt-4">
                        <Button type="submit" disabled={loading || !bannerImage || error}>
                            {loading ? <CustomSpinner /> : "Upload"}
                        </Button>
                        <Button type="button" variant="secondary" onClick={onClose}>
                            Cancel
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
};

export default AddBanner;
