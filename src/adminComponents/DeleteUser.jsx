import { useDispatch, useSelector } from 'react-redux';
import { deleteUser } from "@/redux/usersSlice";
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

export const DeleteUser = ({ user, isOpen, onClose }) => {
    const dispatch = useDispatch();
    const [deleting, setDeleting] = useState(false);
  
    const handleDelete = async () => {
      setDeleting(true);
      try {
        await dispatch(deleteUser(user)).unwrap();
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
            <AlertDialogTitle>Delete User</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete this user? This action cannot be undone.
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
  