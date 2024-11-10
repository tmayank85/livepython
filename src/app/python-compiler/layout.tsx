import React from "react";
import SiteHeader from "@/components/SiteHeader";

export default function compilerLayout({children}: Readonly<{ children: React.ReactNode }>){

    return(<>
            <SiteHeader/>
        {children}
        </>
    )
}