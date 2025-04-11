import EvtView from "@/components/EvtComponents/EvtView";
import { SpacerType } from "@/types/general";
import React from "react";

const Spacer = (props: SpacerType) => {
  let backgroundColor = props.backgroundColor ?? "transparent";
  return (
    <EvtView
      style={[
        { backgroundColor },
        props.style,
        props.flex
          ? { flex: 1 }
          : props.width
          ? { height: "100%", width: props.width }
          : { height: props.height, width: "100%" },
      ]}
    ></EvtView>
  );
};

export default Spacer;
