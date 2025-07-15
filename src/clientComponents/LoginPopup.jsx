import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { clientLogin } from "@/redux/clientSlice/clientAuthSlice";
import { BASE_URL } from "@/constants";
import { toast } from "react-toastify";
import axios from "axios";

const LoginPopup = ({ onClose, onLoginSuccess, productId }) => {
  const dispatch = useDispatch();
  const { loading, error } = useSelector((state) => state.clientAuth);
  const token = useSelector((state) => state.clientAuth.token);

  const [formData, setFormData] = useState({
    mobileNumber: "",
    name: "",
    city: "",
    email: "",
  });

  const [emailError, setEmailError] = useState("");
  const [mobileError, setMobileError] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (e.target.name === "email") setEmailError("");
    if(e.target.name === "mobileNumber") setMobileError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // if (!formData.email.endsWith("@gmail.com")) {
    //   setEmailError("Email must be a Gmail address (@gmail.com)");
    //   return;
    // }

    if (!/^\d{10}$/.test(formData.mobileNumber)) {
      setMobileError("Mobile number must be exactly 10 digits");
      return;
    }

    try {
      // Login the user
      const result = await dispatch(clientLogin(formData));

      console.log("result", result);

      if (result.meta.requestStatus === "fulfilled") {
        // If login is successful, send enquiry request
        await axios.post(
          `${BASE_URL}/user/create/enquiry`,
          { productIds: [productId] },
          { headers: { Authorization: `Bearer ${result?.payload?.token}` } }
        );

        toast.success("Enquiry submitted successfully!", { autoClose: 3000 });
        onClose();
      }
    } catch (error) {
      toast.error("Enquiry failed. Try again.");
      console.error("Enquiry Error:", error);
    }
  };


  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-[100]">
      <div className="bg-white p-6 rounded shadow-lg w-96">
        <h2 className="text-lg font-bold mb-4">Enquiry</h2>
        {error && <p className="text-red-500 mb-2">{error}</p>}

        <form onSubmit={handleSubmit} className="space-y-3">
          <input
            type="text"
            name="name"
            placeholder="Name"
            value={formData.name}
            onChange={handleChange}
            required
            className="w-full p-2 border rounded"
          />
          <input
            type="number"
            name="mobileNumber"
            maxLength={10}
            placeholder="Mobile Number"
            value={formData.mobileNumber}
            onChange={handleChange}
            required
            className="w-full p-2 border rounded"
          />
          {mobileError && <p className="text-red-500 text-sm">{mobileError}</p>}
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            required
            className="w-full p-2 border rounded"
          />
          {emailError && <p className="text-red-500 text-sm">{emailError}</p>}
          <input
            type="text"
            name="city"
            placeholder="City"
            value={formData.city}
            onChange={handleChange}
            required
            className="w-full p-2 border rounded"
          />
          <button
            type="submit"
            className="bg-gradient-to-r from-[#F8710C] to-[#F22B06] rounded-[5px] w-full h-[38px] sm:h-[45px] px-[10px] sm:px-[18px] text-white text-center mt-[16px] sm:mt-[22px] sm:text-[15.25] text-[14px]"
            disabled={loading}
          >
            {loading ? "Enquire in..." : "Enquire"}
          </button>
        </form>

        <button onClick={onClose} className="mt-3 bg-gradient-to-r from-[#F8710C] to-[#F22B06] bg-clip-text text-transparent w-full">
          Cancel
        </button>
      </div>
    </div>
  );
};

export default LoginPopup;
