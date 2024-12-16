import CreateButton from "@/components/triggers/buttons/DefaultButton.jsx";
import Image from 'next/image';

// Default component if there are no clients, projects or delivery notes
const NoX = ({ openCreateDialog, img_src, label }) => (
    <div className="flex-grow flex flex-col items-center">
        <div className="h-[70%] w-[70%] relative flex justify-center items-center">
            <Image
                src={img_src}
                alt={`${label} image`}
                fill
                style={{ objectFit: 'contain' }}
            />
        </div>
        <h1 className="text-3xl pointer-events-none">Create your first {label}</h1>
        <p className="text-lg text-center pointer-events-none">And generate digital Delivery Notes</p>
        <CreateButton onClick={openCreateDialog} text="Create new!" className="w-[20%] mt-4"/>
    </div>
);

export default NoX