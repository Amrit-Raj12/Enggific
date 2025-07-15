

const ChatUsDialog = ({ title, onClose }) => (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
        <div className="relative bg-white p-6 shadow-lg w-[581px] px-[26px] py-[32px]">
            <div onClick={onClose} className="absolute -top-2 right-0 p-4 cursor-pointer">
                <svg width="24px" height="24px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" strokeWidth={0} /><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round" /><g id="SVGRepo_iconCarrier"> <path d="M16 8L8 16M8.00001 8L16 16" stroke="#000000" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /> </g></svg>
            </div>
            <form className="flex flex-col space-y-[2px]">
                <input type="text" placeholder="First Name" className="p-2 bg-[#F8F8F8] h-[48px]" />
                <input type="text" placeholder="Last Name" className="p-2 bg-[#F8F8F8] h-[48px]" />
                <input type="email" placeholder="Email Name" className="p-2 bg-[#F8F8F8] h-[48px]" />
                <input type="text" placeholder="Phone Number" className="p-2 bg-[#F8F8F8] h-[48px]" />
                <textarea placeholder="Message" className="p-2 bg-[#F8F8F8] h-[146px] mb-[8px]" />
                <div className="flex justify-end mt-[8px]">
                    <button type="submit" className="w-[116px] h-[36px] flex justify-center items-center  text-white bg-[#E5810C]">Submit</button>
                </div>
            </form>
        </div>
    </div>
);

export default ChatUsDialog;