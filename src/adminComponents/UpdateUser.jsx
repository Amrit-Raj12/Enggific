import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogClose } from "@/components/ui/dialog";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { editUser } from "@/redux/usersSlice";
import { Input } from "@/components/ui/input";
import { toast } from "react-toastify";
import { Button } from "@/components/ui/button";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
  AlertDialogCancel,
} from '@/components/ui/alert-dialog';

export const UpdateUser = ({ user, isOpen, onClose }) => {
  const dispatch = useDispatch();
  const [name, setName] = useState(user?.name);
  const [mobileNumber, setMobileNumber] = useState(user?.mobileNumber);
  const [email, setEmail] = useState(user?.email);
  const [city, setCity] = useState(user?.city);
  const { editUserLoading } = useSelector((state) => state.usersList);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate mobile number (must be exactly 10 digits)
    if (!/^\d{10}$/.test(mobileNumber)) {
      toast.error("Mobile number must be exactly 10 digits");
      return;
    }
    const formData = new FormData();
    formData.append('id', user?._id);
    formData.append('name', name);
    formData.append('mobileNumber', mobileNumber);
    formData.append('email', email);
    formData.append('city', city);

    try {
      await dispatch(editUser(formData)).unwrap();
      onClose();
      toast.success('User updated successfully');
    } catch (error) {
      console.log(error);
      const errorMessage = error?.error || error?.message || error?.toString() || 'Failed to update user';
      toast.error(errorMessage);
    }
  };

  return (
    <AlertDialog open={isOpen} onClose={onClose} >
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Edit User</AlertDialogTitle>
        </AlertDialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 pb-2">Name</label>
            <Input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="User Name"
              className="w-full"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 pb-2">Mobile Number</label>
            <Input
              type="text"
              value={mobileNumber}
              onChange={(e) => setMobileNumber(e.target.value)}
              placeholder="Mobile Number"
              className="w-full"
              maxLength={10}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 pb-2">Email</label>
            <Input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
              className="w-full"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 pb-2">City</label>
            <Input
              type="text"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              placeholder="City"
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
              disabled={editUserLoading}
              className="bg-[#E5810C] hover:bg-[#E5810C] text-white"
            >
              {editUserLoading ? 'Updating...' : 'Update'}
            </Button>
          </div>
        </form>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default UpdateUser;