import { BorderBeam } from "@/components/magicui/border-beam";
import {
    Card,
} from "@/components/ui/card";


export function OurVisionCard() {
    return (
        <Card className="relative w-full sm:w-[calc(50%-14.5px)] md:w-[calc(50%-14.5px)] h-[320px] shadow-none z-[1] outline-2 outline-gray-800">
            <div className='z-[1] py-[61px] pl-[50px] pr-[18px]'>
                <div className='w-[90px] h-[4px] bg-[#E5810C] mb-[15px]' />
                <div className='mb-[15px]'>
                    <p className='md:text-[38px] text-[32px] font-bold'>Our Vision</p>
                </div>
                <div className=''>
                    <p className='md:text-base text-[13px]'>Our vision is to help our customers achieve precision and accuracy in their results by supplying & equipping them with the most advanced, digital, precise, modern trending - engineering and scientific lab equipment.</p>
                </div>
            </div>
            {/* curve-bg */}
            <div className='absolute bottom-0 left-0 w-full -z-[1]'>
                <svg className='w-full h-[200px]' viewBox="0 0 450 198" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M275.186 96.0202C165.953 16.8358 46.2378 -0.960684 0.0344238 0.0391187L0.0344342 198H450V131.513C379.661 149.909 304.149 115.516 275.186 96.0202Z" fill="#FDF3E7" />
                </svg>
            </div>
            <BorderBeam
                duration={6}
                size={400}
                className="from-transparent via-orange-300 to-transparent"
            />
            <BorderBeam
                duration={6}
                delay={3}
                size={400}
                className="from-transparent via-orange-600 to-transparent"
            />
        </Card>
    );
}
