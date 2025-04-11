import { ProfileType } from "@/types/customer";
import { create } from "zustand";

type ProfileStore = {
  len: () => void;
  profile: ProfileType | undefined;
  clearProfile: () => void;
  changeProfile: (value: ProfileType | undefined) => void;
  uploadImage: (image: string) => void;
  deleteImage: () => void;
  pushAttendProfileId: (occasion_id: string) => void;
  popAttendProfileId: (occasion_id: string) => void;

  pushFollowingId: (customer_id: string) => void;
  popFollowingId: (customer_id: string) => void;

  pushAcceptedFollowerId: (customer_id: string) => void;
  popAcceptedFollowerId: (customer_id: string) => void;
};

export const useProfileStore = create<ProfileStore>((set, get) => ({
  len: () => {
    return get()?.profile?.attendence_ids?.length;
  },
  profile: undefined,
  clearProfile: () => set({ profile: undefined }),
  changeProfile: (value: ProfileType | undefined) => set({ profile: value }),
  uploadImage: (image: string) =>
    set((state) => ({
      profile: state.profile ? { ...state.profile, image } : undefined,
    })),
  deleteImage: () =>
    set((state) => ({
      profile: state.profile
        ? { ...state.profile, image: undefined }
        : undefined,
    })),

  pushAttendProfileId: (occasion_id: string) =>
    set((state) => ({
      profile: state.profile
        ? {
            ...state.profile,
            attendence_ids: [occasion_id, ...state.profile.attendence_ids],
          }
        : undefined,
    })),

  popAttendProfileId: (occasion_id: string) =>
    set((state) => ({
      profile: state.profile
        ? {
            ...state.profile,
            attendence_ids: state.profile.attendence_ids.filter(
              (id) => id != occasion_id
            ),
          }
        : undefined,
    })),

  pushFollowingId: (following_id: string) =>
    set((state) => ({
      profile: state.profile
        ? {
            ...state.profile,
            followings_ids: [following_id, ...state.profile.followings_ids],
          }
        : undefined,
    })),

  popFollowingId: (following_id: string) =>
    set((state) => ({
      profile: state.profile
        ? {
            ...state.profile,
            followings_ids: state.profile.followings_ids.filter(
              (id) => id != following_id
            ),
          }
        : undefined,
    })),

  pushAcceptedFollowerId: (follower_id: string) =>
    set((state) => ({
      profile: state.profile
        ? {
            ...state.profile,
            accepted_followers_ids: [
              follower_id,
              ...state.profile.accepted_followers_ids,
            ],
          }
        : undefined,
    })),

  popAcceptedFollowerId: (follower_id: string) =>
    set((state) => ({
      profile: state.profile
        ? {
            ...state.profile,
            accepted_followers_ids: state.profile.accepted_followers_ids.filter(
              (id) => id != follower_id
            ),
          }
        : undefined,
    })),
}));
