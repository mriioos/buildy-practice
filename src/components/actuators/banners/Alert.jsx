import Image from 'next/image';

export default function Alert({ message, iconURL, close }) {
    return (
        <div onClick={close} className="cursor-pointer w-[100vw] h-[100vh] absolute top-0 left-0 bg-black/80 flex justify-center items-center z-10"> {/* Background */}
            <figure className="pointer-events-none w-[30vw] h-[30vh] flex flex-col justify-center items-center bg-white rounded-md"> {/* Card */}
                <p className="w-[80%] h-fit text-center mb-2">{message}</p>
                {iconURL && 
                    <div className="w-fit h-fit p-[0.2rem] rounded-full animated-gradient"> {/* Icon */}
                        <div className="relative p-3 w-fit h-fit rounded-full bg-white">
                            <Image 
                                src={iconURL}
                                alt="Alert Icon"
                                height={50}
                                width={50}
                            />
                        </div>
                    </div>
                }
            </figure>
        </div>
    );
}