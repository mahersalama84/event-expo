import AppConstants from "@/constants/AppConstants";
import Sizes from "@/constants/Sizes";

export default {
  components: {
    view: {
      justifyContent: "center",
      alignItems: "center",
    },
    button: {
      height: Sizes.inputHeight.md,
      borderRadius: Sizes.border.radius.xl,
    },
    touchable: {
      height: Sizes.inputHeight.md,
      borderRadius: Sizes.border.radius.xl,
    },
    inputContainer: {
      alignItems: "center",
      borderRadius: Sizes.border.radius.xl,
      // borderBottomWidth: Sizes.border.width,
      marginBottom: AppConstants.MEASURING_UNIT,
    },
    handleIndicatorStyle: {
      height: Sizes.handleIndicatorHeight,
      width: Sizes.handleIndicatorWidth,
    },
    input: {
      flex: 1,
      height: Sizes.inputHeight.md,
    },
    card: {
      height: 60,
    },
    cardShadow: {
      backgroundColor: "transparent",
      // shadowColor: "#000",
      shadowOffset: {
        width: -2,
        height: 40,
      },
      shadowOpacity: 0.2,
      // shadowRadius: 1,

      elevation: 1,
    },
  },
};
