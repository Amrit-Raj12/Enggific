import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogClose } from "@/components/ui/dialog";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateCategory } from "@/redux/categorySlice";
import { Input } from "@/components/ui/input";
import { toast } from "react-toastify";
import {Button} from "@/components/ui/button";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogCancel,
} from '@/components/ui/alert-dialog';

export const EditCategory = ({ category, isOpen, onClose }) => {
    const dispatch = useDispatch();
    const [name, setName] = useState(category?.name);
    const [logo, setLogo] = useState(null);
    const { updateCategoryLoading } = useSelector((state) => state.categoryList);
  
    const handleSubmit = async (e) => {
      e.preventDefault();
      const formData = new FormData();
      formData.append('id', category?._id);
      formData.append('name', name);
      if (logo) {
        formData.append('categoryLogo', logo);
      }
  
      try {
        await dispatch(updateCategory(formData)).unwrap();
        onClose();
        toast.success('Category updated successfully');
      } catch (error) {
        console.log(error);
        // Handle different error formats
      const errorMessage = error?.error || error?.message || error?.toString() ;
      toast.error(errorMessage);
      }
    };
  
    return (
      <AlertDialog open={isOpen} onClose={onClose} >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Edit Category</AlertDialogTitle>
          </AlertDialogHeader>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 pb-2">Name</label>
              <Input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Category Name"
                className="w-full"
              />
            </div>
            <div>
            <label className="block text-sm font-medium text-gray-700 pb-2">Logo</label>
              <Input
                type="file"
                onChange={(e) => setLogo(e.target.files[0])}
                accept="image/png,image/jpeg,image/jpg"
                className="w-full"
              />
            </div>
            <div className="flex justify-end gap-2">
              <AlertDialogCancel asChild>
                <Button variant="outline" type="button" onClick={onClose}>
                  Cancel
                </Button>
              </AlertDialogCancel>
              <Button 
                type="submit" 
                disabled={updateCategoryLoading}
              >
                {updateCategoryLoading ? 'Updating...' : 'Update'}
              </Button>
            </div>
          </form>
        </AlertDialogContent>
      </AlertDialog>
    );
  };
