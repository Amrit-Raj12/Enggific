import React, { useState, useEffect, useRef, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useFormik } from "formik";
import * as Yup from "yup";
import { createProduct } from "@/redux/productSlice";
import { fetchCategories } from "@/redux/categorySlice";
import JoditEditor from 'jodit-react';
import { toast } from "react-toastify";
import { X } from "lucide-react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import UsersAndTersmsNavbar from "./UsersNavbar";
import { Input } from "@/components/ui/input";
import { MAX_FILE_SIZE } from "@/constant/constant";
import { supportedFormats } from "@/constant/constant";
import { compressImage } from "./CompressImage";
import MultiCategoryDropdown from "./MultiCategoryDropdown";
import { fetchProductTypes } from "@/redux/productTypeSlice";
import { useNavigate } from "react-router-dom";

const CreateProduct = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { categories } = useSelector((state) => state.categoryList);
  const [isCreating, setIsCreating] = useState(false);
  const [selectedImages, setSelectedImages] = useState([]);
  const [sizeWarning, setSizeWarning] = useState("");
  const fileInputRef = useRef(null);
  const thumbnailInputRef = useRef(null);
  const [thumbnailImage, setThumbnailImage] = useState(null);
  const [thumbnailError, setThumbnailError] = useState("");
  const [loading, setLoading] = useState(false);
  const { productTypes } = useSelector((state) => state.productTypeList);

  const [selectedCategory, setSelectedCategory] = useState(null);
  const [filteredProductTypes, setFilteredProductTypes] = useState([]);


  // console.log("categories admin", categories)

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  useEffect(() => {
    dispatch(fetchProductTypes());
  }, [dispatch]);

  // Handle Category Selection
  // const handleproductTypeSelect = (productType) => {
  //   formik.setFieldValue("productType", productType);
  // };

  const handleProductTypeSelect = (productType, id) => {
    formik.setFieldValue("productType", {
      _id: id,
      name: productType,
    });
  };

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

  const formik = useFormik({
    initialValues: {
      name: "",
      composition: "",
      sku: "",
      categories: [], // Keep as categories in formik
      // tags: "",
      productType: ""
    },
    validationSchema: Yup.object({
      name: Yup.string().required("Product name is required"),
      composition: Yup.string().required("Composition is required"),
      sku: Yup.string().required("SKU is required"),
      // categories: Yup.array()
      //   .min(1, 'Select at least one category')
      //   .required('Categories are required'),
      // productType: Yup.string().required("Please select a Product Type"),
      // tags: Yup.string().optional(),
    }),
    onSubmit: async (values) => {
      if (!thumbnailImage) {
        toast.error("Please upload a thumbnail image.");
        return;
      }



      const data = new FormData();

      setIsCreating(true);
      // const data = new FormData();
      // Add basic fields
      data.append("name", values.name);
      data.append("composition", values.composition);
      data.append("sku", values.sku);
      data.append("productTypeId", values.productType?._id);

      // Handle categories - send as single category field with comma-separated values
      // if (values.categories && values.categories.length > 0) {
      //   data.append("category", values.categories.join(','));
      // }

      // Handle tags
      // if (values.tags) {
      //   data.append("tags", values.tags.split(",").map(tag => tag.trim()));
      // }

      // Append images
      data.append("thumbnailImage", thumbnailImage.file);
      selectedImages.forEach((img) => {
        data.append("productImages", img.file);
      });

      try {
        // console.log("Data to be sent:", data)
        await dispatch(createProduct(data)).unwrap();
        toast.success("Product created successfully");
        formik.resetForm();
        navigate("/admin/dashboard/products");
        setSelectedImages([]);
        setThumbnailImage(null);
        setSizeWarning("");
      } catch (error) {
        const errorMessage = error?.error || error?.message || "Failed to create product";
        toast.error(errorMessage);
      } finally {
        setIsCreating(false);
      }
    },
  });

  // Text Editor Config
  // const descriptionEditorRef = useRef(null);
  const compositionEditorRef = useRef(null);

  const compositionConfig = useMemo(() => ({
    readonly: false,
    height: 300,
    width: '100%',
    placeholder: 'Start typing...',
    toolbarButtonSize: 'small',
    buttons: [
      'undo', 'redo', '|',
      'bold', 'italic', 'underline', 'strikethrough', '|',
      'font', 'fontsize', 'brush', 'paragraph', '|',
      'ul', 'ol', '|',
      'align', 'outdent', 'indent', '|',
      'link', 'table', '|',
      'hr', 'eraser', 'copyformat', '|',
      'symbol', 'fullsize', 'print', 'about'
    ],
    uploader: {
      insertImageAsBase64URI: true
    },
    removeButtons: ['file', 'video', 'image'],
    showCharsCounter: true,
    showWordsCounter: true,
    showXPathInStatusbar: false,
    askBeforePasteHTML: false,
    askBeforePasteFromWord: false,
    defaultActionOnPaste: 'insert_clear_html',
  }), []);


  // Modified handleThumbnailChange function
  const handleThumbnailChange = async (e) => {
    const file = e.target.files[0];

    if (!file) return;

    if (!supportedFormats.includes(file.type)) {
      setThumbnailError("Unsupported format. Please upload jpg, png, jpeg, or webp.");
      return;
    }

    try {
      const compressedImage = await compressImage(file);
      setThumbnailImage(compressedImage);
      setThumbnailError("");
    } catch (error) {
      setThumbnailError(`Failed to process image: ${error.message}`);
    }

    if (thumbnailInputRef.current) {
      thumbnailInputRef.current.value = "";
    }
  };


  return (
    <div className="bg-gray-100">
      <UsersAndTersmsNavbar title="Create Product" />

      <div className="max-w-6xl mx-auto p-6 bg-white shadow-lg rounded-lg mt-10">
        <form onSubmit={formik.handleSubmit} className="space-y-6">
          <div className="grid grid-cols-2 gap-x-6">

            {/* Product Name */}
            <div>
              <div>
                <label className="block text-sm font-medium text-gray-700 pb-2">Product Name</label>
                <Input
                  type="text"
                  id="name"
                  name="name"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.name}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm "
                />
                {formik.touched.name && formik.errors.name && (
                  <div className="text-red-500 mt-1 text-sm">{formik.errors.name}</div>
                )}
              </div>
            </div>

            {/* Thumbnail Image */}
            <div>
              <label className="block text-sm font-medium text-gray-700 pb-2">Thumbnail Image</label>
              <input
                type="file"
                onChange={handleThumbnailChange}
                className="mt-1 block w-full"
                ref={thumbnailInputRef}
              />
              {thumbnailImage && (
                <div className="mt-2 relative">
                  <img src={thumbnailImage.preview} alt="Thumbnail Preview" className="w-20 h-20 object-cover" />
                  <button
                    type="button"
                    onClick={() => setThumbnailImage(null)}
                    className="absolute top-0 right-0 bg-red-500 text-white rounded-full p-1"
                  >
                    <X size={16} />
                  </button>
                </div>
              )}
              {thumbnailError && <div className="text-red-500 mt-1">{thumbnailError}</div>}
            </div>






            {/* Category Selection */}
            {/* Category Dropdown */}
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
            {/* <MultiCategoryDropdown formik={formik} categories={categories} /> */}
            <div className=" mt-4 flex gap-4 items-center justify-start">
              <div className="">
                <label className="block text-sm font-medium text-gray-700 pb-2">
                  Sub category
                </label>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="outline"
                      disabled={!selectedCategory}
                      className="overflow-hidden break-words w-full flex justify-start"
                    >
                      {formik?.values?.productType?.name || "Select Sub Category"}
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="max-h-60 overflow-y-auto">
                    {filteredProductTypes?.map((productType) => (
                      <DropdownMenuItem
                        key={productType._id}
                        onClick={() =>
                          handleProductTypeSelect(productType.name, productType._id)
                        }
                      >
                        {productType.name}
                      </DropdownMenuItem>
                    ))}
                  </DropdownMenuContent>
                </DropdownMenu>

              </div>

              {/* {formik.touched.productType && formik.errors.productType && (
                <div className="text-red-500">{formik.errors.productType}</div>
              )} */}
            </div>
          </div>

          {/* SKU */}
          <div className="mt-4 w-3/12">
            <div>
              <label className="block text-sm font-medium text-gray-700 pb-2">Code</label>
              <Input
                type="text"
                id="sku"
                name="sku"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.sku}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm "
              />
              {formik.touched.sku && formik.errors.sku && (
                <div className="text-red-500 mt-1 text-sm">{formik.errors.sku}</div>
              )}
            </div>
          </div>

          <div className="flex flex-col justify-start">

            {/* Product Details */}
            <div className="max-w-4xl w-full mt-6">
              <label className="block text-sm font-medium text-gray-700 pb-2">Product Details</label>
              <JoditEditor
                ref={compositionEditorRef}
                value={formik.values.composition}
                config={compositionConfig}
                tabIndex={2}
                onBlur={(newContent) => formik.setFieldValue('composition', newContent)}
              />
              {formik.touched.composition && formik.errors.composition && (
                <div className="text-red-500 mt-1">{formik.errors.composition}</div>
              )}
            </div>
          </div>

          {/* Tags */}
          <div className="grid grid-cols-2 gap-x-6 mt-6">

            {/* Product Images */}
            <div className="col-span-1">
              <label className="block text-sm font-medium text-gray-700 pb-2">Product Images</label>
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
          </div>

          {/* Submit Button */}
          <div className="flex justify-end mt-6 max-w-4xl">
            <Button
              type="submit"
              disabled={isCreating || loading}
              className="px-4 py-2 bg-[#E5810C] text-white hover:bg-[#E5810C] transition-colors duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
            >
              {isCreating ? <Loader2 className="mr-2 h-5 w-5 animate-spin" /> : 'Create Product'}
            </Button>
          </div>
        </form>
      </div>
    </div>

  );
};

export default CreateProduct;

{/* <div>
          <label htmlFor="category" className="block text-sm font-medium text-gray-700">Category</label>
          <select
            id="category"
            name="category"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.category}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
          >
            <option value="">Select a category</option>
            {categories.map((category) => (
              <option key={category._id} value={category.name}>
                {category.name}
              </option>
            ))}
          </select>
          {formik.touched.category && formik.errors.category && (
            <div className="text-red-500 mt-1">{formik.errors.category}</div>
          )}
        </div> */}

//   <div>
//   <label htmlFor="description" className="block text-sm font-medium text-gray-700">Description</label>
//   <JoditEditor
//     ref={null}
//     value={formik.values.description}
//     config={editorConfig}
//     tabIndex={1}
//     onBlur={(newContent) => formik.setFieldValue('description', newContent)}
//   />
//   {formik.touched.description && formik.errors.description && (
//     <div className="text-red-500 mt-1">{formik.errors.description}</div>
//   )}
// </div>

// <div>
//   <label htmlFor="composition" className="block text-sm font-medium text-gray-700">Composition</label>
//   <JoditEditor
//     ref={null}
//     value={formik.values.composition}
//     config={editorConfig}
//     tabIndex={2}
//     onBlur={(newContent) => formik.setFieldValue('composition', newContent)}
//   />
//   {formik.touched.composition && formik.errors.composition && (
//     <div className="text-red-500 mt-1">{formik.errors.composition}</div>
//   )}
// </div>