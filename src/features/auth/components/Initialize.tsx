/* eslint-disable no-self-assign */

import { useQueryClient } from "@tanstack/react-query";
import { signInAnonymously } from "firebase/auth";
import { FC, useEffect } from "react";
import { auth } from "src/libs/firebase";
import { client } from "src/libs/graphqlClient";
import { useGlobalState } from "src/store/global/globalStore";
import { useUserState } from "src/store/user/userState";

export const Initialize: FC = () => {
  const setUser = useUserState((state) => state.setUser);
  const setAuthLoading = useGlobalState((state) => state.setAuthLoading);
  const queryClient = useQueryClient();

  useEffect(() => {
    const localUserName = localStorage.getItem("user_name");

    const unSubUser = auth.onAuthStateChanged(async (user) => {
      if (user) {
        const idTokenResult = await user.getIdTokenResult(true);
        const res = await fetch("/api/auth/setCustomClaims", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            idToken: idTokenResult.token,
            refreshToken: user.refreshToken,
          }),
        });

        if (res.status === 200 && res.ok) {
          const token = await auth.currentUser?.getIdToken(true);
          client.setHeader("Authorization", `Bearer ${token}`);
        }

        setUser({
          id: user.uid,
          anonymous: user.isAnonymous,
          photo_url: user.photoURL,
          user_name: localUserName ?? user.displayName ?? "匿名",
        });

        if (!localUserName && user.displayName) {
          localStorage.setItem("user_name", user.displayName);
        }
        if (!user.isAnonymous) {
          queryClient.invalidateQueries(["comments"]);
          queryClient.invalidateQueries(["replies"]);
        }
        setAuthLoading(false);
      } else {
        (async () => {
          await signInAnonymously(auth).then((result) => result.user);
        })();
      }
    });

    return () => {
      unSubUser();
    };
  }, [queryClient, setAuthLoading, setUser]);

  return null;
};
