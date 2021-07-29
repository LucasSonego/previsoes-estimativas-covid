import React from "react";
import { useState } from "react";

import { Container } from "./styles";

interface props {
  maxHeight: string;
}

const ExpandingLabel: React.FC<props> = props => {
  const [isOpen, setIsOpen] = useState<Boolean>(false);

  return (
    <Container
      onClick={() => (isOpen ? setIsOpen(false) : setIsOpen(true))}
      isOpen={isOpen}
      maxHeight={props.maxHeight}
    >
      {props.children}
    </Container>
  );
};

export default ExpandingLabel;
