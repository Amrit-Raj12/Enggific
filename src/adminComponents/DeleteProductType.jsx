import { useDispatch, useSelector } from 'react-redux';
import { deleteProductType } from "@/redux/productTypeSlice";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
  } from '@/components/ui/alert-dialog';
  import CustomSpinner from "./CustomSpinner";
  import { useState } from "react";
import { toast } from "react-toastify";

 const DeleteProductType = ({ productType, isOpen, onClose }) => {
    const dispatch = useDispatch();
    const { deleteProductTypeLoading } = useSelector((state) => state.productTypeList);
    const [deleting, setDeleting] = useState(false);
  
    const handleDelete = async () => {
      setDeleting(true);
      try {
        await dispatch(deleteProductType(productType)).unwrap();
        onClose();
        toast.success('Product Type deleted successfully');
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
            <AlertDialogTitle>Delete Product Type</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete {productType?.name}? This action cannot be undone.
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
  
  export default DeleteProductType;