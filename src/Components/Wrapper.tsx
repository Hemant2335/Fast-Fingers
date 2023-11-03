import React, { ReactNode } from 'react'

interface WrapperProps {
    children: ReactNode;
    classname?: string;
}

const Wrapper = ({children, classname}: WrapperProps) => {
    return (
        <div className={`w-full max-w-[1380px] px-5 md:px-10 mx-auto ${classname || "" }`}>{children}</div>
    )
}

export default Wrapper