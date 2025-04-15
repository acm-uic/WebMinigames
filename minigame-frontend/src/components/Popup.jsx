import React, { useState } from "react"

/*
    Popup component acts as a container and is wrapped around the content you want to hover over
    and, when hovered, the given component will appear under the initial element.
    For example, you can replace the outer div of some elements to make it a popup.
    Props:
        className: classes to style the element that will trigger the popup
        popupClassName: classes to style the element after being hovered over
        PopupInfo: component that will be displayed in the popup after the initial element
        popupProps: props to be passed to the PopupInfo component
        children: children of the Popup component (automatically added when Popup is wrapped around other elements)
*/
const Popup = ({ className, popupClassName, PopupInfo, popupProps, children }) => {
    const [isVisible, setIsVisible] = useState(false);

    return (
        <div className="relative size-fit"  onMouseEnter={() => setIsVisible(true)} onMouseLeave={() => setIsVisible(false)}>
            {/* Initial Element */}
            <div className={className}>
                {children}
            </div>

            {/* Popup Element (displays over intial element) */}
            <div className={`${isVisible ? "opacity-100" : "invisible opacity-0"} ${popupClassName} transition duration-200 absolute z-[99] p-[10px] top-[-10px] left-[-10px] rounded-lg shadow-lg shadow-zinc-500`}>
                {/* Copy of initial element */}
                <div className={className}>
                    {children}
                </div>
                {/* Given component with given props */}
                <PopupInfo {...popupProps} />
            </div>
        </div>
    )
}

export default Popup