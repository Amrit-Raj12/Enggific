import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogClose } from "@/components/ui/dialog";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateProductType } from "@/redux/productTypeSlice";
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
import CustomSpinner from "./CustomSpinner";
import { useEffect } from "react";
import { BASE_URL, Token } from "@/constants";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const EditProductType = ({ productType, isOpen, onClose }) => {
  const dispatch = useDispatch();
  const [name, setName] = useState(productType?.name);
  const [logo, setLogo] = useState(null);
  const { updateProductTypeLoading } = useSelector((state) => state.productTypeList);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(productType?.category._id || "");

  const navigate = useNavigate();

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/admin/get/categories`, {
          headers: {
            Authorization: `Bearer ${Token}`
          }
        });
        setCategories(response.data.categories || []);
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };

    fetchCategories();
  }, [Token]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('id', productType?._id);
    formData.append('name', name);
    formData.append("categoryId", selectedCategory);
    if (logo) {
      formData.append('productTypeLogo', logo);
    }

    try {
      await dispatch(updateProductType(formData)).unwrap();
      navigate(0);
      toast.success('Product Type updated successfully');
      onClose();
    } catch (error) {
      console.log(error);
      // Handle different error formats
      const errorMessage = error?.error || error?.message || error?.toString() || 'Failed to update product type';
      toast.error(errorMessage);
    }
  };

  return (
    <AlertDialog open={isOpen} onClose={onClose} >
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Edit Product Type</AlertDialogTitle>
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
            <label className="block mb-1">Category</label>
            <select
              className="w-full p-2 border rounded"
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
            >
              <option value="">Select Category</option>
              {categories && categories.map((category) => (
                <option key={category._id} value={category._id}>
                  {category.name}
                </option>
              ))}
            </select>
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
              disabled={updateProductTypeLoading}
            >
              {updateProductTypeLoading ? <CustomSpinner /> : 'Update'}
            </Button>
          </div>
        </form>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default EditProductType;