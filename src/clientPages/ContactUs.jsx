import ChatUsDialog from '@/clientComponents/ChatUsDialog';
import ContactUsMap from "@/clientComponents/ContactUsMap";
import Loader from '@/clientComponents/Loader';
import LocationMap from "@/clientComponents/LocationMap";
import useFetchData from '@/clientComponents/utils/useFetchData';
import { BASE_URL } from '@/constants';
import React from 'react'
import { useState } from 'react';

const ContactUs = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        mobileNumber: '',
        message: '',
    });

    const [mobileError, setMobileError] = useState("");

    const apiUrl = `${BASE_URL}/user/get/socialMediaLinks`

    const { data, loading, error } = useFetchData(apiUrl)

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
        if(e.target.name === "mobileNumber") setMobileError("");
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!/^\d{10}$/.test(formData.mobileNumber)) {
            setMobileError("Mobile number must be exactly 10 digits");
            return;
          }
      
        console.log(formData);
    };

    if (loading) return <Loader />
    if (error) return <div>Error: {error.message}</div>

    const mobileNumber = (data && data.links) && data.links[0]?.adminMobileNumber

    const emailId = (data && data.links) && data.links[0]?.adminEmail

    return (
        <div className="flex flex-col lg:flex-row justify-center items-center px-[16px] sm:px-[40px] md:px-[60px] xl:px-[150px] pt-[60px]  lg:pt-[126px] pb-[30px] sm:pb-[40px] md:pb-[60px]">
            <div className="bg-white rounded-lg w-full max-w-[545px] mb-8 lg:mb-0">
                <h2 className="md:text-[54px] text-[26px] font-bold mb-[15px] sm:mb-[36px] text-left ">Get in Touch</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-2 sm:mb-5">
                        <input
                            type="text"
                            id="name"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            className="w-full px-4 py-2 mt-2 h-[38px] sm:h-[50px] border border-gray-300 rounded-md 
                            placeholder:text-[12px] sm:placeholder:text-[14px] placeholder:text-[#aaaaaa]
                            "
                            required
                            placeholder="Name"
                        />
                    </div>

                    <div className="mb-2 sm:mb-5">
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            className="w-full px-4 py-2 mt-2 border h-[38px] sm:h-[50px] border-gray-300 rounded-md  placeholder:text-[12px] sm:placeholder:text-[14px] placeholder:text-[#aaaaaa]"
                            required
                            placeholder="Email"
                        />
                    </div>

                    <div className="mb-2 sm:mb-5">
                        <input
                            type="number"
                            id="mobileNumber"
                            name="mobileNumber"
                            value={formData.mobileNumber}
                            onChange={handleChange}
                            className="w-full px-4 py-2 mt-2 border h-[38px] sm:h-[50px] border-gray-300 rounded-md  placeholder:text-[12px] sm:placeholder:text-[14px] placeholder:text-[#aaaaaa]"
                            required
                            placeholder="Phone Number"
                        />
                        {mobileError && <p className="text-red-500 text-sm">{mobileError}</p>}
                    </div>

                    <div className="mb-2 sm:mb-5">
                        <textarea
                            id="message"
                            name="message"
                            value={formData.message}
                            onChange={handleChange}
                            className="w-full px-4 py-2 mt-2 border h-[38px] sm:h-[50px] border-gray-300 rounded-md  placeholder:text-[12px] sm:placeholder:text-[14px] placeholder:text-[#aaaaaa]"
                            required
                            placeholder="Message"
                        />
                    </div>

                    <button className="bg-gradient-to-r from-[#F8710C] to-[#F22B06] rounded-[5px] h-[38px] sm:h-[45px] px-[10px] sm:px-[18px] text-white text-center sm:text-[15.25] text-[14px] w-full mb-[30px] sm:mb-[40px] md:mb-[60px] hover:from-[#FFFFFF] hover:text-[#F22B06] hover:border border-[#F22B06] font-bold">
                        Submit
                    </button>
                </form>

                <div className="flex sm:flex-row flex-col  sm:space-x-8">
                    <div className="flex items-center mb-[10px] sm:mb-0">
                        <img src="/phone.png" alt="phone" className="w-[22px] h-[22px] sm:w-[28px] sm:h-[28px] mr-[15px]" />
                        <div>
                            <p className="text-[14px] sm:text-[16px] font-bold">PHONE</p>
                            {loading ? "" :<a href={`tel:+91${mobileNumber}`} className="flex items-center gap-2"><span className="text-balck hover:text-orange-500 transition-all duration-300">+91 {mobileNumber}</span></a>}
                        </div>
                    </div>

                    <div className="flex items-center ml-[0px] sm:ml-8">
                        <img src="/email.png" alt="email" className="w-[22px] h-[22px] sm:w-[28px] sm:h-[28px] mr-[15px]" />
                        <div>
                            <p className="text-[14px] sm:text-[16px] font-bold">EMAIL</p>
                            <a href={`mailto:${emailId}`}><span className="text-balck hover:text-orange-500 transition-all duration-300">{emailId}
                            </span>    
                            </a>
                        </div>
                    </div>
                </div>



            </div>

            {/* LocationMap - Show map next to the form on large screens, below it on smaller screens */}
            <div className="hidden lg:block w-full md:w-[50%] ml-[50px]">
                <ContactUsMap />
            </div>

            <div className="lg:hidden w-full ">
                <ContactUsMap height="300" />
            </div>
        </div>
    );
};

export default ContactUs;


// const ContactUs = () => {
//     const [activePopup, setActivePopup] = useState(null);

//     const apiUrl = `${BASE_URL}/user/get/socialMediaLinks`;

//     const { data, loading, error } = useFetchData(apiUrl);

//     if (loading) return <Loader />

//     const handleOpen = (type) => {
//         setActivePopup(type);
//     };

//     const handleClose = () => {
//         setActivePopup(null);
//     };
//     return (
//         <div className='md:mt-[170px] mt-[100px] pb-[128px] px-[16px]'>
//             <div>
//                 <div className='md:block hidden text-center md:mb-[127px] mb-[30px]'>
//                     <h2 className='md:text-[38px] text-[26px] text-textOrange font-bold'>How can we help you?</h2>
//                 </div>

//                 <div className="flex md:flex-wrap md:flex-row flex-col justify-center gap-4">
//                     {/* Chats_us */}
//                     {/* <div onClick={() => handleOpen('chat')} className={`cursor-pointer border border-[#AEAEAE] w-full h-40 sm:h-48 md:h-56 lg:w-[321px] lg:h-[321px] flex flex-col justify-center items-center ${activePopup ?  'border-[#FDC115]' : ''}`}>
//                         <div className='bg-[#FDC115] w-[110px] h-[110px] rounded-full flex justify-center items-center mb-[29px]'>
//                             <svg width={64} height={64} viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
//                                 <path fillRule="evenodd" clipRule="evenodd" d="M32 0C14.3264 0 0 14.3264 0 32C0 38.048 1.68 43.712 4.6016 48.5376L1.7472 58.24C1.58331 58.7971 1.57253 59.388 1.71598 59.9507C1.85944 60.5133 2.15183 61.027 2.56243 61.4376C2.97303 61.8482 3.48666 62.1406 4.04933 62.284C4.61201 62.4275 5.20293 62.4167 5.76 62.2528L15.4624 59.3984C20.4502 62.4163 26.1703 64.0079 32 64C49.6736 64 64 49.6736 64 32C64 14.3264 49.6736 0 32 0ZM24.7616 39.2416C31.2352 45.712 37.4144 46.5664 39.5968 46.6464C42.9152 46.768 46.1472 44.2336 47.4048 41.2928C47.5636 40.927 47.6212 40.5252 47.5717 40.1295C47.5221 39.7338 47.3672 39.3586 47.1232 39.0432C45.3696 36.8032 42.9984 35.1936 40.6816 33.5936C40.1979 33.2591 39.6034 33.125 39.023 33.2192C38.4425 33.3135 37.921 33.6289 37.568 34.0992L35.648 37.0272C35.5471 37.1846 35.3898 37.2975 35.2083 37.3427C35.0269 37.3879 34.835 37.362 34.672 37.2704C33.3696 36.5248 31.472 35.2576 30.1088 33.8944C28.7456 32.5312 27.5552 30.72 26.8864 29.5008C26.8035 29.3459 26.7795 29.1662 26.8189 28.995C26.8583 28.8238 26.9585 28.6726 27.1008 28.5696L30.0576 26.3744C30.4796 26.0075 30.7519 25.4982 30.8227 24.9436C30.8935 24.3889 30.7579 23.8275 30.4416 23.3664C29.008 21.2672 27.3376 18.5984 24.9152 16.8288C24.6026 16.6023 24.2364 16.461 23.8526 16.4189C23.4688 16.3768 23.0807 16.4354 22.7264 16.5888C19.7824 17.8496 17.2352 21.0816 17.3568 24.4064C17.4368 26.5888 18.2912 32.768 24.7616 39.2416Z" fill="white" />
//                             </svg>
//                         </div>

//                         <p className='text-2xl font-bold text-textOrange'>Chat With Us</p>
//                         <p className='text-base text-textBlack'>Have a Query? Let’s Chat!</p>
//                         <p className='text-[13px] text-[#959595]'>Chat us on whatsapp</p>
//                     </div> */}
//                     {/* Call_us */}
//                     <a href={`tel:+91${data && data.links[0]?.adminMobileNumber}`}>
//                         <div className="border border-[#AEAEAE] w-[349px] h-[349px] sm:h-48 md:h-56 lg:w-[321px] lg:h-[321px] flex flex-col justify-center items-center p-4">

//                             <div
//                                 className='bg-[#FDC115] w-[129.88px] h-[129.88px] md:w-[110px] md:h-[110px] rounded-full flex justify-center items-center md:mb-[29px] mb-[16px] bg-no-repeat bg-center bg-contain'
//                                 style={{ backgroundImage: "url('/call.svg')" }}
//                             >
//                             </div>



//                             <p className='text-2xl font-bold text-textOrange'>Call Us</p>
//                             <p className='text-base text-textBlack'>+91 {data?.links && data.links[0]?.adminMobileNumber}</p>
//                             <p className='text-[13px] text-[#959595]'>Monday - Saturday 9:00 AM - 5:00 PM</p>
//                         </div>
//                     </a>

//                     {/* Email_us */}
//                     <a href={`mailto:${data && data.links[0].adminEmail}`}>
//                         <div className="border border-[#AEAEAE] w-[349px] h-[349px] sm:h-48 md:h-56 lg:w-[321px] lg:h-[321px] flex flex-col justify-center items-center">
//                         <div
//                                 className='bg-[#FDC115] w-[129.88px] h-[129.88px] md:w-[110px] md:h-[110px] rounded-full flex justify-center items-center md:mb-[29px] mb-[16px] bg-no-repeat bg-center bg-contain'
//                                 style={{ backgroundImage: "url('/email.svg')" }}
//                             >
//                             </div>

//                             <p className='text-2xl font-bold text-textOrange'>Email Us</p>
//                             <p className='text-base text-textBlack'>{data?.links && data.links[0]?.adminEmail}</p>
//                             <p className='text-[13px] text-[#959595]'>Get answers within 1-2 business days</p>
//                         </div>
//                     </a>

//                 </div>
//             </div>
//             {activePopup === 'chat' && <ChatUsDialog title={activePopup} onClose={handleClose} />}
//         </div>
//     )
// }

// export default ContactUs