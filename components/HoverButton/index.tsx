import React, { forwardRef } from "react";
import Link from "next/link";

interface HoverButton {
  label: string;
  href: string;
}

function HoverButton({ label, href }: HoverButton, ref: any) {
  return (
    <Link ref={ref} href={href} className="hover-btn font-nunito font-medium">
      <div className="circle">
        <div className="circle-fill" style={{ transform: "scale(0, 0)" }}></div>
        <svg
          viewBox="0 0 50 50"
          xmlns="http://www.w3.org/2000/svg"
          className="circle-outline"
        >
          <circle cx="25" cy="25" r="23"></circle>
        </svg>
        <div className="circle-icon">
          <svg
            viewBox="0 0 11 10"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="icon-arrow"
          >
            <path
              d="M0 5.65612V4.30388L8.41874 4.31842L5.05997 0.95965L5.99054 0L10.9923 4.97273L6.00508 9.96L5.07451 9.00035L8.43328 5.64158L0 5.65612Z"
              fill="currentColor"
            ></path>
          </svg>
        </div>
      </div>
      <span className="label">
        {label}
        <span className="border"></span>
      </span>
    </Link>
  );
}

export default forwardRef(HoverButton);
