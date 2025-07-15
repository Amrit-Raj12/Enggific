import React from 'react';
import { Check } from 'lucide-react';
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

const MultiCategoryDropdown = ({ formik, categories }) => {
  const handleCategoryToggle = (categoryName) => {
    // Get current categories as an array
    const currentCategories = formik.values.categories || [];

    // Update categories
    const updatedCategories = currentCategories.includes(categoryName)
      ? currentCategories.filter(cat => cat !== categoryName)
      : [...currentCategories, categoryName];

    // Set as array directly
    formik.setFieldValue('categories', updatedCategories);
  };

  const getDisplayText = () => {
    const selectedCategories = formik?.values?.categories || [];
    if (selectedCategories.length === 0) return "Select Specialties";
    return selectedCategories.join(', ');
  };

  return (
    <div className="col-span-2 md:col-span-1 mt-4">
      <label className="block text-sm font-medium text-gray-700 pb-2">
        Specialties
      </label>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            className="w-full justify-start h-auto min-h-10 text-left"
          >
            <span className="line-clamp-2 text-sm">
              {getDisplayText()}
            </span>
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-64">
          <div className="space-y-2">
            {categories?.map((category) => (
              <div
                key={category._id}
                className="flex items-center space-x-2 p-2 hover:bg-gray-100 rounded-md cursor-pointer"
                onClick={() => handleCategoryToggle(category.name)}
              >
                <div className={`w-4 h-4 border rounded-sm flex items-center justify-center
                    ${formik?.values?.categories?.includes(category.name)
                    ? 'bg-primary border-primary'
                    : 'border-gray-300'}`}
                >
                  {formik?.values?.categories?.includes(category.name) && (
                    <Check className="h-3 w-3 text-primary-foreground" />
                  )}
                </div>
                <span className="text-sm">{category.name}</span>
              </div>
            ))}
          </div>
        </PopoverContent>
      </Popover>
      {formik.touched.categories && formik.errors.categories && (
        <div className="text-red-500">{formik.errors.categories}</div>
      )}
    </div>
  );
};

export default MultiCategoryDropdown;