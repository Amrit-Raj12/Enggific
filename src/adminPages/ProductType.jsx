import React from "react";
import { fetchProductTypes } from "@/redux/productTypeSlice";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import {
    Dialog,
    DialogContent,
    DialogTrigger,
} from "@/components/ui/dialog"
import { useState } from "react";
import NoData from "@/adminComponents/NoData";
import MainLoader from "@/adminComponents/MainLoader";
import { Pencil, Trash2 } from "lucide-react";
import { toast } from "react-toastify";
import ProductTypeNavbar from "@/adminComponents/ProductTypeNavbar";
import EditProductType from "@/adminComponents/EditProductType";
import DeleteProductType from "@/adminComponents/DeleteProductType";

const ProductTypes = () => {
    const { productTypes } = useSelector((state) => state.productTypeList);
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(false);
    const [isEditOpen, setIsEditOpen] = useState(false);
    const [isDeleteOpen, setIsDeleteOpen] = useState(false);
    const [selectedProductType, setSelectedProductType] = useState(null);

    useEffect(() => {
        const loadCategories = async () => {
            if (loading) return; // Prevent multiple calls
            setLoading(true); // Set loading to true before fetching

            try {
                await dispatch(fetchProductTypes());
            } catch (error) {
                toast.error("Failed to fetch enquiries:", error);
                // Optionally, you can set an error state here
            } finally {
                setLoading(false); // Always set loading to false after fetching
            }
        };

        loadCategories();
    }, [dispatch]);

   // Handle edit
    const handleEdit = (productType) => {
        setSelectedProductType(productType);
        setIsEditOpen(true);
    };

    // // Handle delete
    const handleDelete = (productType) => {
        setSelectedProductType(productType);
        setIsDeleteOpen(true);
    };

    if (loading) {
        return <MainLoader />
    }

    return (
        <div>
            <ProductTypeNavbar />
            <div className="p-4">
                {productTypes && productTypes.length > 0 ? (
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Name</TableHead>
                                <TableHead>Category</TableHead>
                                <TableHead>Logo</TableHead>
                                <TableHead>Edit</TableHead>
                                <TableHead>Delete</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {productTypes?.map((productType) => (
                                <TableRow key={productType._id}>
                                    <TableCell>
                                        {productType?.name}
                                    </TableCell>
                                    <TableCell>
                                        {productType?.category?.name}
                                    </TableCell>
                                    <TableCell>
                                        <Dialog>
                                            <DialogTrigger className="cursor-pointer text-blue-600">View Logo</DialogTrigger>
                                            <DialogContent>
                                                {productType?.productTypeLogo ? <img src={productType?.productTypeLogo} alt="logo" /> : <p>No logo available</p>}
                                            </DialogContent>
                                        </Dialog>
                                    </TableCell>
                                    <TableCell>
                                    <Pencil className="h-5 w-5 cursor-pointer" onClick={() => handleEdit(productType)} />
                                    </TableCell>
                                    <TableCell>
                                    <Trash2 className="h-5 w-5 cursor-pointer" onClick={() => handleDelete(productType)} />
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                ) : (
                    <div className="w-full h-[calc(100vh-200px)] flex items-center justify-center">
                        <NoData name="Categories" />
                    </div>
                )}
            </div>

            {isEditOpen && (
                <EditProductType
                    isOpen={isEditOpen}
                    onClose={() => setIsEditOpen(false)}
                    productType={selectedProductType}
                />
            )}
            {isDeleteOpen && (
                <DeleteProductType 
                isOpen={isDeleteOpen} 
                onClose={() => setIsDeleteOpen(false)}
                productType={selectedProductType}
                 />
            )}
        </div>
    )
}

export default ProductTypes