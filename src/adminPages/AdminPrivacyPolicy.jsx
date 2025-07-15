import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import JoditEditor from 'jodit-react';
import UsersAndTersmsNavbar from "@/adminComponents/UsersNavbar";
import { Loader2 } from "lucide-react";
import { toast } from "react-toastify";
import MainLoader from "@/adminComponents/MainLoader";
import { fetchPrivacy, updatePrivacy } from '@/redux/privacySlice';

const AdminPrivacyPolicy = () => {
    const dispatch = useDispatch();
    const editor = useRef(null);
    const { content } = useSelector((state) => state.privacy);
    const [privacyPolicy, setPrivacyPolicy] = useState(content);
    const [privacyLoading, setPrivacyLoading] = useState(false);
    const [loadingPrivacy, setLoadingPrivacy] = useState(false);


    useEffect(() => {
        const loadPrivacy = async () => {
            if (loadingPrivacy) return; // Prevent multiple calls
            setLoadingPrivacy(true); // Set loading to true before fetching
    
            try {
                await dispatch(fetchPrivacy());
            } catch (error) {
                console.error("Failed to fetch enquiries:", error);
                // Optionally, you can set an error state here
            } finally {
                setLoadingPrivacy(false); // Always set loading to false after fetching
            }
        };
        
        loadPrivacy();
    }, [dispatch]);
    
    useEffect(() => {
        setPrivacyPolicy(content);
    }, [content]);

    if (loadingPrivacy) {
        return (
            <MainLoader />
        )
    }

    const handleSave = async () => {
        try {
            setPrivacyLoading(true);
            await dispatch(updatePrivacy(privacyPolicy)).unwrap();
            toast.success('Privacy Policy updated successfully');
        } catch (err) {
            const errorMessage = error?.error || error?.message || "Failed to update Privacy Policy";
            toast.error(errorMessage);
        } finally {
            setPrivacyLoading(false);
        }
    };

    return (
        <div>
            <UsersAndTersmsNavbar title="Privacy Policy" />
       
        <div className="min-h-screen bg-gray-100 p-6">
            
            <div className="max-w-4xl mx-auto mt-6 p-6 bg-white rounded-lg shadow-lg">
           
          
                <>
                 <div className="mb-4">
                    <JoditEditor
                        ref={editor}
                        value={privacyPolicy}
                        config={{
                            placeholder: "" // Set the placeholder to an empty string
                        }}
                        tabIndex={1}
                        onBlur={newContent => setPrivacyPolicy(newContent)}
                        onChange={newContent => {}}
                    />
                    </div>
                    <div className="text-right">
                    <button onClick={handleSave} 
                                className="bg-[#E5810C] text-white px-4 py-2 rounded hover:bg-[#E5810C] focus:outline-none">
                        {privacyLoading ? <Loader2 className="animate-spin h-5 w-5" /> : "Save"}
                    </button>
                    </div>
                </>
      
            </div>
        </div>
        </div>
    );
};

export default AdminPrivacyPolicy;


// const editorConfig = {
    //     buttons: [
    //         'bold', 'italic', 'underline', 'strikethrough', 
    //         'align', 'undo', 'redo', 'ul', 'ol', 'outdent', 'indent', 'font', 'fontsize', 'brush', 'link'
    //     ],
    //     toolbarSticky: false,
    //     showXPathInStatusbar: false,
    //     askBeforePasteHTML: false,
    //     askBeforePasteFromWord: false,
    //     defaultActionOnPaste: 'insert_only_text',
    // };

     // config={editorConfig}