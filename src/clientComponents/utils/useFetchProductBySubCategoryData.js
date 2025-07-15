import { BASE_URL } from '@/constants';
import { useState, useEffect } from 'react';

const useFetchProductBySubCategoryData = (productTypeId) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);

      try {
        const response = await fetch(`${BASE_URL}/user/get/type/products`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ productTypeId }),
        });

        if (!response.ok) {
          throw new Error('Network response was not ok');
        }

        const result = await response.json();

        // console.log("result", result)
        setData(result);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    if (productTypeId) {
      fetchData();
    }
  }, [productTypeId]);

  return { data, loading, error };
};

export default useFetchProductBySubCategoryData;