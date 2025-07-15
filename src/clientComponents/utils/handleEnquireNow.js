 const handleEnquireNow = async (id) => {
        if (user && token) {
          // User authenticated, make the post request
          try {
            const response = await axios.post(
              `${BASE_URL}/user/create/enquiry`,
              { productIds: [id] },
              { headers: { Authorization: `Bearer ${token}` } }
            );
    
            toast.success("Enquiry succesfull team will contact soon", { autoClose: 3000 });
            // console.log("Enquiry successful", response.data);
          } catch (error) {
            toast.error("Enquiry failed");
            console.error("Enquiry failed", error);
          }
        } else {
          // User is not authenticated, show login popup
          setShowLogin(true);
        }
      };


      export default handleEnquireNow