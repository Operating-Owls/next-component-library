import React, { useRef, useEffect, useState } from "react";
import styles from "./tooltip.module.css"; // Import as a module

/**
 * ToolTip component.
 * @param {object} props - The props object.
 * @param {JSX.Element} props.component - The component to display in the tooltip.
 * @param {JSX.Element} props.children - The object to apply the tooltip to.
 * @param {object} [props.style] - Optional style object to apply to the tooltip.
 * @param {boolean} [props.interactive] - Whether the tooltip should be interactive.
 * @param {object} rest - Any additional props to apply to the tooltip, such as event handlers.
 */
const ToolTip = ({ component = <div><p>Pass a "component" prop to put your own component here!</p></div>, children, style = {}, interactive, ...rest }) => {
    // when the tooltip is hovered, it will be visible
    const [isVisible, setIsVisible] = useState(false);
    const [position, setPosition] = useState({ x: 0, y: 0 });
    const [arrowStyle, setArrowStyle] = useState(style); // [1]
    // reference to the tooltip element
    const toolTipContainerRef = useRef(null);
    const toolTipRef = useRef(null);
    useEffect(() => {
        let timeoutId = null;

        const calculatePosition = (tooltipElement, toolTipComponent) => {
            let { top, left, width, height } = tooltipElement.getBoundingClientRect();
            left += width / 2;
            top -= 15;
            
            const { width: componentWidth, height: componentHeight } = toolTipComponent.getBoundingClientRect();
            let addedArrowStyle = {};
            
            // Adjust horizontally
            if (left + componentWidth / 2 > window.innerWidth) {
                left -= componentWidth;
                toolTipRef.current.style.transform = "translateX(0%) translateY(-100%)";
                addedArrowStyle.left = "90%";
            } else if (left - componentWidth / 2 < 0) {
                left += componentWidth / 2;
                addedArrowStyle.left = "10%";
            }
            console.log(top, componentHeight, height);
            // Adjust vertically if too high
            if (top - componentHeight - 15 - 15 < 0) {
                top = top + componentHeight + height * 2 + 15;
                addedArrowStyle = { ...addedArrowStyle, top: "0%", transform: "translateX(-50%) translateY(-50%)rotate(45deg)" };
            }
            // adjust top based on how much the user has scrolled
            top += window.scrollY;
        
            return { left, top, addedArrowStyle };
        };
        
        const handleMouseEnter = () => {
            // If a timeout has been set, clear it
            if (timeoutId) clearTimeout(timeoutId);
        
            // Get elements and their dimensions
            const tooltipElement = toolTipContainerRef.current;
            const toolTipComponent = toolTipRef.current;
        
            // Calculate position and style adjustments
            const { left, top, addedArrowStyle } = calculatePosition(tooltipElement, toolTipComponent);
        
            // Update state
            setArrowStyle({...style, ...addedArrowStyle });
            setPosition({ x: left, y: top });
            setIsVisible(true);
        };

        const handleMouseLeave = () => {
            if (interactive) {
                // Set a timeout to hide the tooltip
                timeoutId = setTimeout(() => {
                    setIsVisible(false);
                }, 200);
            } else {
                setIsVisible(false);
            }
        };

        const tooltipElement = toolTipContainerRef.current;
        tooltipElement.addEventListener("mouseenter", handleMouseEnter);
        tooltipElement.addEventListener("mouseleave", handleMouseLeave);

        return () => {
            clearTimeout(timeoutId);
            tooltipElement.removeEventListener("mouseenter", handleMouseEnter);
            tooltipElement.removeEventListener("mouseleave", handleMouseLeave);
        };
    }, [interactive, style]);

    const newStyle = { ...style, top: position.y, left: position.x };

    return (
        <div
            ref={interactive ? toolTipContainerRef : null}
            style={interactive ? { width: "fit-content", display: "inline-block" } : null}
        >
            <div ref={toolTipRef}
                className={`${styles.tooltip} ${!isVisible && styles.hidden}`}
                {...rest}
                style={newStyle}
            >
                <div className={styles.tooltipArrow} style={arrowStyle} />
                <div>{component}</div>
            </div>
            {!interactive ? (
                <div
                    ref={toolTipContainerRef}
                    style={{ width: "fit-content", display: "inline-block" }}
                >
                    {children}
                </div>
            ) : (
                <div>{children}</div>
            )}
        </div>
    );
};

export default ToolTip;
