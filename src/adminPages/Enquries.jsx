import React, { useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { fetchEnquiries } from "@/redux/enquiriesSlice";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import moment from "moment";
import EnquiriesNavbar from "@/adminComponents/EnquiriesNavbar";
import EnquiryStatusDropdown from "@/adminComponents/EnquiryStatusDropdown";
import NoData from "@/adminComponents/NoData";
import { Input } from "@/components/ui/input";
import MainLoader from "@/adminComponents/MainLoader";
import DeleteEnquiry from "@/adminComponents/DeleteEnquiry";
import { Trash2 } from "lucide-react";

const Enquiries = () => {
    const dispatch = useDispatch();
    const {
        enquiries,
        dateRange,
        selectedUser,
        selectedCity,
        selectedStatus,
        status,
        error
    } = useSelector(state => state.enquiryList);
    const [enquiriesLoading, setEnquiriesLoading] = useState(false);
    const [openDeleteEnquiry, setOpenDeleteEnquiry] = useState(false);
    const [selectedEnquiry, setSelectedEnquiry] = useState(null);

    const handleDeleteEnquiry = async (enquiry) => {
        setOpenDeleteEnquiry(true);
        setSelectedEnquiry(enquiry);
    };

    useEffect(() => {
        const loadEnquiries = async () => {
            if (enquiriesLoading) return; // Prevent multiple calls
            setEnquiriesLoading(true); // Set loading to true before fetching

            try {
                await dispatch(fetchEnquiries());
            } catch (error) {
                console.error("Failed to fetch enquiries:", error);
                // Optionally, you can set an error state here
            } finally {
                setEnquiriesLoading(false); // Always set loading to false after fetching
            }
        };

        loadEnquiries();
    }, [dispatch]);



    const filteredEnquiries = useMemo(() => {
        return enquiries.filter(enquiry => {
            const enquiryDate = moment(enquiry?.createdAt).startOf('day');
            const startDate = dateRange.startDate ? moment(dateRange.startDate).startOf('day') : null;
            const endDate = dateRange.endDate ? moment(dateRange.endDate).startOf('day') : null;

            const isInDateRange = !startDate || !endDate ||
                (enquiryDate.isSameOrAfter(startDate) && enquiryDate.isSameOrBefore(endDate));

            const matchesCity = !selectedCity || enquiry?.user?.city === selectedCity;
            const matchesUser = !selectedUser || enquiry?.user?.name === selectedUser;
            const matchesStatus = !selectedStatus || enquiry?.status === selectedStatus;

            return isInDateRange && matchesCity && matchesUser && matchesStatus;
        });
    }, [enquiries, dateRange, selectedCity, selectedUser, selectedStatus]);

    if (enquiriesLoading) {
        return (
            <MainLoader />
        );
    }

    return (
        <div>
            <EnquiriesNavbar />

            <div className="p-4">
                {filteredEnquiries && filteredEnquiries?.length > 0 ? (
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Date</TableHead>
                                <TableHead>User Name</TableHead>
                                <TableHead>Mobile Number</TableHead>
                                <TableHead>Email</TableHead>
                                <TableHead>Products</TableHead>
                                <TableHead>Status</TableHead>
                                <TableHead>City</TableHead>
                                <TableHead>Delete</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>

                            {filteredEnquiries?.map((enquiry) => (
                                <TableRow key={enquiry._id}>
                                    <TableCell>
                                        {enquiry?.createdAt ? moment(enquiry?.createdAt).format('D MMM YYYY') : ''}
                                        <br />
                                        <span className="mt-2 inline-block">
                                            {enquiry?.createdAt ? moment(enquiry?.createdAt).format('hh:mm A') : ''}
                                        </span>
                                    </TableCell>
                                    {console.log("enquiry", enquiry)}
                                    <TableCell>{enquiry?.user?.name}</TableCell>
                                    <TableCell>{enquiry?.user?.mobileNumber}</TableCell>
                                    <TableCell>{enquiry?.user?.email}</TableCell>
                                    <TableCell>
                                        <Input
                                            className="w-[250px] h-[50px]"
                                            type="text"
                                            value={enquiry.productDetails.map((product) => product?.name).join(', ')}
                                        />
                                    </TableCell>
                                    <TableCell>
                                        <EnquiryStatusDropdown enquiryId={enquiry?._id} currentStatus={enquiry?.status} />
                                    </TableCell>
                                    <TableCell>{enquiry?.user?.city}</TableCell>
                                    <TableCell>
                                        <Trash2 className="h-5 w-5 cursor-pointer" onClick={() => handleDeleteEnquiry(enquiry)} />
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                ) : (
                    <div className="w-full h-[calc(100vh-200px)] flex items-center justify-center">
                        <NoData name="Enquiries" />
                    </div>
                )}
            </div>

                {openDeleteEnquiry && (
                    <DeleteEnquiry
                        isOpen={openDeleteEnquiry}
                        onClose={() => setOpenDeleteEnquiry(false)}
                        enquiry={selectedEnquiry}
                    />
                )}
        </div>
    );
};

export default Enquiries;