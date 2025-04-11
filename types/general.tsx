import * as Iconsax from "iconsax-react-native";
import { ComponentProps, ReactNode } from "react";
import {
  ScrollView as DefaultScrollView,
  Text as DefaultText,
  TextInput as DefaultTextInput,
  View as DefaultView,
  FlatList,
  FlatListProps,
  ImageSourcePropType,
  ListRenderItemInfo,
  StyleProp,
  TouchableOpacity,
  ViewStyle,
  ViewToken,
} from "react-native";
import {
  Avatar as DefaultAvatar,
  Button as DefaultButton,
  Switch as DefaultSwitch,
} from "react-native-elements";
import { PanGestureHandlerGestureEvent } from "react-native-gesture-handler";
import { AnimatedRef, SharedValue } from "react-native-reanimated";

export type getThemeColorType = (color: string) => string;

export type rootType = { children: ReactNode };

export type ButtonHeaderAnimationType = {
  scrollY: SharedValue<number>;
  children: ReactNode;
};

export type CarouselButtonAnimationType = {
  title: string;
  icon: Iconsax.Icon;
  dataLength: number;
  flatListIndex: SharedValue<number>;
  flatListRef: AnimatedRef<FlatList<any>>;
  x: SharedValue<number>;
  handlePress: () => void;
};

export type CountDownOtpAnimationType = {
  children: ReactNode;
  valueChanged: SharedValue<boolean>;
};

export type FabAnimationType = {
  title: string;
  icon: Iconsax.Icon;
  scrollY: SharedValue<number>;
  handlePressFab: () => void;
};

export type ScrollTopAnimationType = {
  scrollTop: () => void;
};

export type HomeHeaderAnimationType = {
  scrollY: SharedValue<number>;
  children: ReactNode;
};

export type ProfileHeaderAnimationType = {
  scrollY: SharedValue<number>;
};

export type AvatarType = ComponentProps<typeof DefaultAvatar> & {
  background?: string | string[];
  badgeTop?: boolean;
  badgeTopValue?: number;
  badgeBottom?: boolean;
  badgeSize?: number;
  badgeStatus?: boolean;
  avatarContainerStyle?: ViewStyle;
};

export type ButtonType = ComponentProps<typeof DefaultButton> & {
  shadow?: boolean;
};

export type ChipType = {
  style?: ViewStyle;
  title: string | number;
  titleColor: string;
  icon?: Iconsax.Icon;
  iconColor?: string;
  iconSize?: number;
};

export type ConfirmDialogType = {
  confirming: boolean;
  setConfirming: (status: boolean) => void;
  visible: boolean;
  message: string;
  subMessage: string;
  cancelButtonText?: string;
  confirmButtonText: string;
  confirmButtonColor: string;
  confirmed: () => void;
  closed: () => void;
};

export type DeviderType = ComponentProps<typeof DefaultButton> & {
  color: string;
  height: number;
};

export type DialogType = {
  visible: boolean;
  onClose?: () => void;
  children?: any;
  withoutCalculateBottomNavigationBar?: boolean;
  withouCalculatetAppBar?: boolean;
  withouCalculatetTabbar?: boolean;
  bigMargin?: boolean;
};

export type EmptyListType = {
  icon: Iconsax.Icon;
  backgroundColor?: string;
  text?: string;
  description?: string;
  marginTop?: number;
};

export type LineOverTextType = { text: string };

export type OtpType = {
  numberOfInputs: number;
  onFinish: (otp: string) => void;
  autoFocus?: boolean;
};

export type ScrollViewType = ComponentProps<typeof DefaultScrollView>;

export type SkeletonType = {
  shadow?: boolean;
  width?: number;
  height?: number;
  style?: any;
  randomWidth?: boolean;
  minWidth?: number;
  maxWidth?: number;
  marginBottom?: number;
  borderRadius?: number;
};

export type SwitchType = ComponentProps<typeof DefaultSwitch>;

export type TextType = ComponentProps<typeof DefaultText> & {
  errorText?: boolean;
  infoText?: boolean;
};

export type TextInputType = ComponentProps<typeof DefaultTextInput> & {
  shadow?: boolean;
  multiline?: boolean;
  reverse?: boolean;
  prefixText?: string;
  prefixTextStyle?: ViewStyle;
  prefixIcon?: {
    component: Iconsax.Icon;
    color?: string;
    size?: number;
  };
  placeholderTextColor?: string;
  prefixAddHoc?: ReactNode;
};

export type TouchableType = {
  activeColor?: string;
  style?: ViewStyle;
  children: ReactNode;
  handleSingleTap: () => void;
  handleDoubleTap?: () => void;
};

export type TouchableButtonType = {
  title: string;
  type: string;
  disabled: boolean;
  loading: boolean;
  buttonStyle: ViewStyle;
  titleStyle: ViewStyle;
  handlePress: () => void;
};

export type ViewType = ComponentProps<typeof DefaultView> & {
  stretch?: boolean;
};

export type IconType = ComponentProps<typeof Iconsax.Icon> & {
  icon: Iconsax.Icon | undefined;
  noReverse?: boolean;
};

export type BottomTabIconType = {
  icon: Iconsax.Icon;
  focused: boolean;
  size?: number;
};

export type AddSquareType = {
  style: ViewStyle;
  handlePress: () => void;
};

export type BackButtonType = ComponentProps<typeof TouchableOpacity> & {
  scrollY?: SharedValue<number>;
  color: string;
  headerText?: string;
  actionIcon?: Iconsax.Icon;
  handlePressAction?: () => void;
};

export type CarouselType = {
  finish: boolean;
  flatListRef: AnimatedRef<any>;
  onScroll: (e: PanGestureHandlerGestureEvent) => void;
  dataSource: any[];
  renderItem: ({ item, index }: { item: any; index: number }) => JSX.Element;
  keyExtractor: (item: any) => string;
  onViewableItemsChanged: ({
    viewableItems,
  }: {
    viewableItems: ViewToken[];
  }) => void;
  pagination: boolean;
  x: SharedValue<number>;
  emptyIcon?: Iconsax.Icon;
  emptyText?: string;
  emptyTextDescription?: string;
};

export type CountDownOtpType = {
  mobile: string | undefined;
  resendOtp: (newOtp: number) => void;
};

export type DotType = {
  index: number;
  x: SharedValue<number>;
};

export type ImagePickerType = {
  edit: boolean;
  image: string | undefined;
  setImage: (file: any) => void;
};

export type LargeLoadingType = { style?: ViewStyle };

export type MediumLoadingType = {
  style?: ViewStyle;
  color?: string;
  size?: number;
};

export type PaginationType = {
  data: Array<any>;
  x: SharedValue<number>;
};

export type ProfileImagePickerType = {
  loading: boolean;
  setLoading: (value: boolean) => void;
};

export type SmallLoadingType = {
  style?: ViewStyle;
  color?: string;
};

export type SpacerType = {
  backgroundColor?: string;
  style?: ViewStyle;
  height?: number;
  width?: number;
  flex?: boolean;
};

export type AdvertisementItemType = {
  item: string;
};

export type HomeHeaderType = {
  scrollY: SharedValue<number>;
};

export type HomeWelcomeType = HomeHeaderType & {
  textColor: string;
};

export type ListHeaderType = {
  captionSize?: "small" | "large";
  captionContainerStyle?: ViewStyle;
  captionStyle?: ViewStyle;
  caption?: string;
  captionIcon?: Iconsax.Icon;
  captionIconVariant?:
    | "Linear"
    | "Outline"
    | "Broken"
    | "Bold"
    | "Bulk"
    | "TwoTone"
    | undefined;
  captionIconColor?: string;
  captionIconSize?: number;
  onPressCaptionIcon?: () => void;
};

export type HorizontalListType<T> = ListHeaderType & {
  onRefresh?: () => void;
  onEndReached?: () => void;
  onEndReachedThreshold?: number;
  onMomentumScrollBegin?: () => void;
  onMomentumScrollEnd?: () => void;
  onScroll?: () => void;
  onScrollBeginDrag?: () => void;
  contentContainerStyle?: StyleProp<ViewStyle>;
  skeletonArrayLength?: number;
  pagingEnabled?: boolean;
  loading?: boolean;
  refreshing?: boolean;
  finish?: boolean;
  hideEmptyText?: boolean;
  withoutPadding?: boolean;
  prefixItems?: JSX.Element;
  gap?: number;
  renderItem: (data: ListRenderItemInfo<T>) => JSX.Element;
  renderSkeleton?: (data: ListRenderItemInfo<T>) => JSX.Element;
  keyExtractor?: ((item: T, index: number) => string) | undefined;
  datasource: T[];
  emptyIcon: Iconsax.Icon;
  emptyText?: string;
  emptyTextDescription?: string;
  /** Aviaibility to control FlatList */
  flatListCustomProps?: FlatListProps<T>;
  /** For improve performance of FlatList */
  itemWidth?: number;
  /** For improve performance of FlatList */
  itemHeight?: number;
};

export type VerticalListType<T> = ListHeaderType & {
  backgroundColor?: string;
  loading?: boolean;
  finish?: boolean;
  refreshing?: boolean;
  onRefresh?: () => void;
  onEndReached?: () => void;
  onEndReachedThreshold?: number;
  onMomentumScrollBegin?: () => void;
  onMomentumScrollEnd?: () => void;
  onScroll?: () => void;
  onScrollBeginDrag?: () => void;
  hideEmptyText?: boolean;
  datasource: T[];
  contentContainerStyle?: StyleProp<ViewStyle>;
  skeletonArrayLength?: number;
  beforeList?: JSX.Element;
  numColumns?: number;
  gap?: number;
  emptyIcon: Iconsax.Icon;
  emptyText?: string;
  emptyTextDescription?: string;
  lastItemRender?: JSX.Element;
  renderItem: (data: ListRenderItemInfo<T>) => JSX.Element;
  renderSkeleton?: (data: ListRenderItemInfo<T>) => JSX.Element;
  keyExtractor?: ((item: T, index: number) => string) | undefined;
};

export type SettingsButtonType = {
  scrollY: SharedValue<number>;
};

export type BaseScreenType = {
  scrollY?: SharedValue<number>;
  paddingTopOfScreen?: boolean;
  topPart?: ReactNode;
  header?: boolean;
  headerText?: string;
  screenText?: string;
  image?: ImageSourcePropType;
  children?: ReactNode;
  actionIcon?: Iconsax.Icon;
  handlePressAction?: () => void;
};
export type HeaderTextAnimationType = {
  scrollY: SharedValue<number>;
  children: ReactNode;
};

export type BaseBottomSheetType = {
  height?: number;
  isOpen: boolean;
  backdropOnPress: () => void;
  children: ReactNode;
};

export type CollapsedBottomSheetType = {
  backgroundColor: string;
  position?: number;
  collapse?: number;
  fixedHeader: JSX.Element;
  children: ReactNode;
};

export type BounceLoadingType = {
  direction: "X" | "Y";
  color?: string;
  circleSize: number;
  circleBorderWidth: number;
  dotSize: number;
};

export type BounceAnimationType = {
  children: ReactNode;
  MOVE_Y: number;
  direction: "X" | "Y";
};
export type BottomTabIconAnimationType = {
  children: ReactNode;
  focused: boolean;
};
export type SelectedMobilePrefixType = {
  reverse: boolean;
  color: string;
  style: ViewStyle;
};
