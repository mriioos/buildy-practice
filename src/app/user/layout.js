import React from 'react';
//import "./globals.css";

export const metadata = {
    title: "Dash Board",
    description: "Generated by me",
};
  

export default function DashBoardLayout({ children }){
    return (
        <section>
            <nav className=""> {/* Side Bar */}

            </nav>
            <section> {/* Main Content */}
                <nav> {/* Top Bar */}
                    <div> {/* Section description */}

                    </div>
                    <div> {/* Search bar */}

                    </div>
                    <div> {/* Action buttons */}
                        
                    </div>
                </nav>
                {children}
            </section>
        </section>
    );
};