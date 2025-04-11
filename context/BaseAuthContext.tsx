import { useMyOccasionsStore } from "@/stores/MyOccasionsStore";
import { useOtherOccasionsStore } from "@/stores/OtherOccasionsStore";
import { useProfileStore } from "@/stores/ProfileStore";
import { ProfileType } from "@/types/customer";
import { router } from "expo-router";
import { PropsWithChildren, createContext, useContext } from "react";
import { useStorageState } from "../hooks/useStorageState";

const BaseAuthContext = createContext<{
  logInSession: (token: string, customer: ProfileType) => void;
  logOutSession: () => void;
  session?: string | null;
  isLoading: boolean;
}>({
  logInSession: (token: string, customer: ProfileType) => null,
  logOutSession: () => null,
  session: null,
  isLoading: false,
});

export function useSession() {
  const value = useContext(BaseAuthContext);

  if (process.env.NODE_ENV !== "production") {
    if (!value) {
      throw new Error("useSession must be wrapped in a <SessionProvider />");
    }
  }
  return value;
}

export function SessionProvider(props: PropsWithChildren) {
  const [[isLoading, session], setSession] = useStorageState("session");
  const changeProfile = useProfileStore((state) => state.changeProfile);
  const clearMyOccasions = useMyOccasionsStore((state) => state.clearOccasions);
  const clearOtherOccasions = useOtherOccasionsStore(
    (state) => state.clearOccasions
  );

  return (
    <BaseAuthContext.Provider
      value={{
        logInSession: (token: string, customer: ProfileType) => {
          setSession(token);
          changeProfile(customer);
        },
        logOutSession: () => {
          clearMyOccasions();
          clearOtherOccasions();
          changeProfile(undefined);

          setSession(null);
          router.replace({ pathname: "/auth/login" });
        },
        session,
        isLoading,
      }}
    >
      {props.children}
    </BaseAuthContext.Provider>
  );
}
