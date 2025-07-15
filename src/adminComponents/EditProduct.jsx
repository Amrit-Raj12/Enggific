import React, { useEffect, useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { updateProduct } from '@/redux/productSlice';
import { DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from 'react-toastify';
import CustomSpinner from "./CustomSpinner";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { compositionConfig } from "./JoditConfig";
import JoditEditor from 'jodit-react';
import { supportedFormats } from "@/constant/constant";
import { compressImage } from "./CompressImage";
import { fetchCategories } from "@/redux/categorySlice";
import { fetchProductTypes } from "@/redux/productTypeSlice";
import { Badge } from "@/components/ui/badge";
import { X } from "lucide-react";

const EditProduct = ({ product, onSave }) => {
    const dispatch = useDispatch();
    const { categories } = useSelector((state) => state.categoryList);
    const { productTypes } = useSelector((state) => state.productTypeList);
    const [isUpdating, setIsUpdating] = useState(false);
    const fileInputRef = useRef(null);
    const imagePreviewRef = useRef(null);
    const compositionEditorRef = useRef(null);
    const [selectedProductType, setSelectedProductType] = useState(
        productTypes.find(type => type._id === product?.productType?._id)?.name || 'Select Product Type'
    );

    const [selectedCategory, setSelectedCategory] = useState(null);
    const [filteredProductTypes, setFilteredProductTypes] = useState([]);

    
    useEffect(() => {
        const productType = productTypes.find(type => type._id === product?.productType?._id)?.name || 'Select Product Type'
        setFilteredProductTypes([productType])
        setSelectedProductType(productType)
    }, [productTypes]);

    useEffect(() => {
        dispatch(fetchCategories());
        dispatch(fetchProductTypes());
    }, []);

    console.log(productTypes, "productTypes")

    const formik = useFormik({
        initialValues: {
            id: product?._id || "",
            name: product?.name || "",
            composition: product?.composition || "",
            sku: product?.sku || "",
            productTypeId: product?.productType?._id || "",
            thumbnailImage: null,
        },
        validationSchema: Yup.object({
            name: Yup.string().required("Product name is required"),
            composition: Yup.string().required("Composition is required"),
            sku: Yup.string().required("SKU is required"),

            thumbnailImage: Yup.mixed().nullable(),
        }),
        onSubmit: async (values) => {
            setIsUpdating(true);
            const data = new FormData();

            // Format the data according to backend expectations
            const formattedValues = {
                ...values,
            };

            // Append all values to FormData
            Object.entries(formattedValues).forEach(([key, value]) => {
                if (value !== null && value !== undefined) {
                    if (key === "thumbnailImage" && value instanceof File) {
                        data.append(key, value);
                    } else if (Array.isArray(value)) {
                        data.append(key, value.join(','));
                    } else {
                        data.append(key, value);
                    }
                }
            });

            try {
                await dispatch(updateProduct(data)).unwrap();
                toast.success("Product updated successfully");
                window.location.reload();
                // if (onSave) onSave();
            } catch (error) {
                toast.error(error?.error || "Failed to update product");
            } finally {
                setIsUpdating(false);
            }
        },
    });

    const handleFileChange = async (e) => {
        const file = e.currentTarget.files[0];

        if (file) {
            // Clear previous preview if it exists
            if (imagePreviewRef.current) {
                URL.revokeObjectURL(imagePreviewRef.current.src);
            }

            // Compress the image
            try {
                const { file: compressedFile, preview } = await compressImage(file);

                // Set the compressed file and its preview in Formik
                formik.setFieldValue("thumbnailImage", compressedFile);

                // Set the preview image
                if (imagePreviewRef.current) {
                    imagePreviewRef.current.src = preview;
                }
            } catch (error) {
                toast.error("Image compression failed: " + error.message);
                console.error("Compression error:", error);
            }
        }
        // // Create and set new preview
        // const previewUrl = URL.createObjectURL(file);
        // if (imagePreviewRef.current) {
        //     imagePreviewRef.current.src = previewUrl;
        // }

        //     formik.setFieldValue("thumbnailImage", file);
        // }

        formik.setFieldTouched("thumbnailImage", true, false);
    };

    const handleCategorySelect = (category) => {
        setSelectedCategory(category);
        // Filter product types based on the selected category
        const filteredTypes = productTypes.filter(
            (productType) => productType.category._id === category._id
        );
        setFilteredProductTypes(filteredTypes);
        // Reset productType selection
        formik.setFieldValue("productType", null);
    };

    return (
        <div className="max-w-6xl mx-auto p-6 bg-white shadow-lg rounded-lg mt-10">
            <form onSubmit={formik.handleSubmit} className="space-y-4">
                <div className="grid grid-cols-2 gap-6">
                    {/* Name and SKU fields */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 pb-2">
                            Product Name
                        </label>
                        <Input
                            name="name"
                            value={formik.values.name}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            placeholder="Enter product name"
                        />
                        {formik.touched.name && formik.errors.name && (
                            <div className="text-red-500">{formik.errors.name}</div>
                        )}
                    </div>

                    {/* Thumbnail Image */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 pb-2">Thumbnail Image</label>
                        <div className="space-y-4">

                            {/* File Input */}
                            <div className="flex flex-col">
                                <Input
                                    ref={fileInputRef}
                                    type="file"
                                    name="thumbnailImage"
                                    onChange={handleFileChange}
                                    onBlur={formik.handleBlur}
                                    className="input"
                                    accept="image/jpeg,image/png,image/webp"
                                />
                                {(formik?.touched?.thumbnailImage || formik.values.thumbnailImage) && formik.errors.thumbnailImage && (
                                    <div className="text-red-500 text-sm mt-1">{formik.errors.thumbnailImage}</div>
                                )}
                            </div>

                            {/* Image Preview */}
                            {(product?.thumbnailImage || formik.values.thumbnailImage) && (
                                <div className="relative w-[80px] h-[80px] border rounded-lg overflow-hidden">
                                    <img
                                        ref={imagePreviewRef}
                                        src={formik.values.thumbnailImage ? URL.createObjectURL(formik.values.thumbnailImage) : product?.thumbnailImage}
                                        alt="Product thumbnail"
                                        className="w-full h-full object-cover"
                                        onError={(e) => {
                                            e.target.style.display = 'none';
                                        }}
                                    />
                                </div>
                            )}
                        </div>
                    </div>

                    


                    {/* Category */}
                    <div className="block mt-4">
                        <label className="block text-sm font-medium text-gray-700 pb-2">
                            Category
                        </label>
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button variant="outline" className="w-full flex justify-start">
                                    {selectedCategory?.name || "Select Category"}
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent>
                                {categories?.map((category) => (
                                    <DropdownMenuItem
                                        key={category._id}
                                        onClick={() => handleCategorySelect(category)}
                                    >
                                        {category.name}
                                    </DropdownMenuItem>
                                ))}
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </div>

                    {/* Product Type */}
                    <div className='mt-4'>
                        <label className="block text-sm font-medium text-gray-700 pb-2">
                            Sub category
                        </label>
                        <DropdownMenu>
                            <DropdownMenuTrigger className="w-full px-4 py-2 text-left border rounded-md" asChild>
                            <Button variant="outline" disabled={!selectedCategory} className="overflow-hidden break-words w-full flex justify-start">
                                {selectedProductType}
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent>
                                {filteredProductTypes.map((type) => (
                                    <DropdownMenuItem
                                        key={type._id}
                                        onClick={() => {
                                            formik.setFieldValue('productTypeId', type._id);
                                            setSelectedProductType(type.name);
                                        }}
                                    >
                                        {type.name}
                                    </DropdownMenuItem>
                                ))}
                            </DropdownMenuContent>
                        </DropdownMenu>
                        {formik.touched.productTypeId && formik.errors.productTypeId && (
                            <div className="text-red-500">{formik.errors.productTypeId}</div>
                        )}
                    </div>

                    <div className='w-3/12'>
                        <label className="block text-sm font-medium text-gray-700 pb-2">
                            Code
                        </label>
                        <Input
                            name="sku"
                            value={formik.values.sku}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            placeholder="Enter SKU"
                        />
                        {formik.touched.sku && formik.errors.sku && (
                            <div className="text-red-500">{formik.errors.sku}</div>
                        )}
                    </div>
                </div>

                {/* Composition */}
                <div className="flex flex-col justify-start">
                    <div className="max-w-4xl w-full mt-6">
                        <label className="block text-sm font-medium text-gray-700 pb-2">
                        Product Details
                        </label>
                        <JoditEditor
                            ref={compositionEditorRef}
                            value={formik.values.composition}
                            config={compositionConfig}
                            tabIndex={2}
                            onBlur={newContent => formik.setFieldValue('composition', newContent)}
                        />
                    </div>
                </div>

                {/* Tags */}
                {/* <div className="w-full">
                    <label className="block text-sm font-medium text-gray-700 pb-2">
                        Tags
                    </label>
                    <Input
                        name="tags"
                        value={formik.values.tags.join(',')}
                        onChange={(e) => formik.setFieldValue('tags', e.target.value.split(','))}
                        onBlur={formik.handleBlur}
                        placeholder="Enter tags separated by commas"
                    />
                </div> */}

                <DialogFooter className="max-w-4xl">
                    <Button type="submit" className="bg-[#E5810C] hover:bg-[#E5810C]" disabled={isUpdating}>
                        {isUpdating ? <CustomSpinner size={20} /> : "Update"}
                    </Button>
                </DialogFooter>
            </form>
        </div>
    );
};

export default EditProduct;