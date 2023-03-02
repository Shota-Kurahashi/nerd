/* eslint-disable no-self-assign */

import { signInAnonymously } from "firebase/auth";
import { useEffect } from "react";
import { auth } from "../libs/firebase";
import { createClients } from "../libs/graphqlClient";
import { useUserState } from "../store/user/userState";
import { useGlobalState } from "src/store/global/globalStore";

const useInitialize = () => {
  const TOKEN_KEY = process.env.NEXT_PUBLIC_TOKEN_KEY as string;
  const setClient = useGlobalState((state) => state.setClient);
  const setUser = useUserState((state) => state.setUser);
  const setAuthLoading = useGlobalState((state) => state.setAuthLoading);

  useEffect(() => {
    const localUserName = localStorage.getItem("user_name");

    const unSubUser = auth.onAuthStateChanged(async (user) => {
      if (user) {
        const idTokenResult = await user.getIdTokenResult(true);
        const isHasClaims = idTokenResult.claims[TOKEN_KEY];
        if (idTokenResult.token && isHasClaims) {
          const client = createClients(idTokenResult.token);
          setClient(client);
        } else {
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
            const client = createClients(token);
            setClient(client);
          }
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
  }, [TOKEN_KEY, setUser, setAuthLoading, setClient]);
};

export default useInitialize;
