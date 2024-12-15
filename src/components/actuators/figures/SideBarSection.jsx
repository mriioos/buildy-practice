
import Divider from "@/components/actuators/figures/Divider.jsx";

export default function SideBarSection({ isOpen, title, children }) {

    return (
        <>
            <p className="block mt-2 text-slate-600 w-[95%] ml-auto mr-auto transition-all"> {isOpen ? <>&nbsp;{title}</> : <>&nbsp;</>}</p> {/* Section description */}
            <div className="flex flex-col w-full h-fit gap-y-2 "> {/* Link Buttons */}
                {children}
            </div>
            <Divider direction="h" color="slate-300" width="1px" length="100%" margin="2"/> {/* Divider */}
        </>
    );
}