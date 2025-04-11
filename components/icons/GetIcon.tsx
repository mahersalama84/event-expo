import { useLanguageStore } from "@/stores/LanguageStore";
import { IconType } from "@/types/general";

const GetIcon = (props: IconType) => {
  const Icon = props.icon;
  const isRTL = useLanguageStore((state) => state.isRTL);
  return (
    <Icon
      style={[
        { marginBottom: 0 },
        isRTL && !props.noReverse
          ? { transform: [{ rotateY: "180deg" }] }
          : null,
      ]}
      {...props}
    />
  );
};
export default GetIcon;
