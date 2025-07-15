import { useDispatch, useSelector } from 'react-redux';
import { deleteCategory } from '@/redux/categorySlice';
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
  } from '@/components/ui/alert-dialog';
  import CustomSpinner from "./CustomSpinner";
  import { useState } from "react";
import { toast } from "react-toastify";

export const DeleteCategory = ({ category, isOpen, onClose }) => {
    const dispatch = useDispatch();
    const { deleteCategoryLoading } = useSelector((state) => state.categoryList);
    const [deleting, setDeleting] = useState(false);
  
    const handleDelete = async () => {
      setDeleting(true);
      try {
        await dispatch(deleteCategory(category)).unwrap();
        onClose();
        toast.success('Category deleted successfully');
      } catch (error) {
        toast.error(error.message);
      } finally {
        setDeleting(false);
      }
    };
  
    return (
      <AlertDialog open={isOpen} onClose={onClose}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Category</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete {category?.name}? This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={onClose}>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDelete}
              disabled={deleting}
              className="bg-red-500 hover:bg-red-600"
            >
              {deleting ? <CustomSpinner /> : 'Delete'}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    );
  };
  