import Link from "next/link";
import Image from "next/image";
import { useEffect } from "react";

export default function UserProfile() {

    const user = { // Declare user data object (And set default values)
        name : 'John',
        surname : 'Doe',
        email : 'johndoe@domain.ext',
        img : '/multimedia/img/icons/user.svg'
    }

    useEffect(() => {

    }, []);

    return (
        <Link href="/user/settings" className="flex w-fit h-fit items-center"> {/* User Image */}
            <div className="flex items-center justify-center w-fit h-fit bg-yellow-400 rounded-full p-2">
                <Image
                    src={user.img}
                    alt="Qiskit Banner"
                    width={35}
                    height={35}
                    style={{ objectFit: 'contain' }}
                />
            </div>
            <div className="flex flex-col items-center justify-left w-fit h-full pl-2"> {/* User Data */}
                <p className="w-full text-black text-sm text-left">{user.name} {user.surname}</p>
                <p className="w-full text-slate-600 text-xs text-left">{user.email}</p>
            </div>
        </Link>
    );
}