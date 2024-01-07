import React, { useContext } from "react";
import {
  TransitionGroup,
  Transition as ReactTransition,
} from "react-transition-group";

import { usePathname } from "next/navigation";
import TransitionContext from "@/utils/context/TransitionContext";
import gsap from "@/utils/gsap";

const TIMEOUT = 200;

const getTransitionStyles: any = {
  entering: {
    position: `absolute`,
    opacity: 0,
    transform: `translateX(50px)`,
  },
  entered: {
    transition: `opacity ${TIMEOUT}ms ease-in-out, transform ${TIMEOUT}ms ease-in-out`,
    opacity: 1,
    transform: `translateX(0px)`,
  },
  exiting: {
    transition: `opacity ${TIMEOUT}ms ease-in-out, transform ${TIMEOUT}ms ease-in-out`,
    opacity: 0,
    transform: `translateX(-50px)`,
  },
};

type Props = {
  children: React.ReactNode;
  location: string;
};

const Transition = ({ children, location }: Props) => {
  return (
    <TransitionGroup style={{ position: "relative" }}>
      <ReactTransition
        key={location}
        timeout={{
          enter: TIMEOUT,
          exit: TIMEOUT,
        }}
      >
        {(status) => (
          <div
            style={{
              ...getTransitionStyles[status],
            }}
          >
            {children}
          </div>
        )}
      </ReactTransition>
    </TransitionGroup>
  );
};

export default Transition;
