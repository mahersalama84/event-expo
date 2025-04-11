import {
  Fragment,
  PropsWithChildren,
  createContext,
  useContext,
  useState,
} from "react";

const BaseBottomSheetContext = createContext<{
  BaseBottomSheet: JSX.Element;
  openBaseBottomSheet: (_BaseBottomSheet: JSX.Element) => void;
  closeBaseBottomSheet: () => void;
  isOpen: boolean;
}>({
  BaseBottomSheet: <Fragment />,
  openBaseBottomSheet: (_BaseBottomSheet: JSX.Element) => null,
  closeBaseBottomSheet: () => null,
  isOpen: false,
});

export function useBaseBottomSheet() {
  const value = useContext(BaseBottomSheetContext);

  if (process.env.NODE_ENV !== "production") {
    if (!value) {
      throw new Error(
        "useBaseBottomSheet must be wrapped in a <BaseBottomSheetProvider />"
      );
    }
  }
  return value;
}

export function BaseBottomSheetProvider(props: PropsWithChildren) {
  const [isOpen, setIsOpen] = useState(false);
  const [BaseBottomSheet, setBaseBottomSheet] = useState(<Fragment />);
  const openBaseBottomSheet = (_BaseBottomSheet: JSX.Element) => {
    setIsOpen(true);
    setBaseBottomSheet(_BaseBottomSheet);
  };
  const closeBaseBottomSheet = () => {
    setIsOpen(false);
    setBaseBottomSheet(<Fragment />);
  };
  return (
    <BaseBottomSheetContext.Provider
      value={{
        openBaseBottomSheet,
        closeBaseBottomSheet,
        BaseBottomSheet,
        isOpen,
      }}
    >
      {props.children}
    </BaseBottomSheetContext.Provider>
  );
}
