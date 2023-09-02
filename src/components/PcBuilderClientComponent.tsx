'use client'

import { useAppSelector } from "@/store/hook";

const PcBuilderClientComponent = () => {
    const pc = useAppSelector(state=>state.pcBuilder.pc);
    console.log(pc);
    return (
        <div>
            Pcbuilder component
        </div>
    );
};

export default PcBuilderClientComponent;