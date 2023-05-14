/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react/jsx-no-useless-fragment */
/* eslint-disable no-self-assign */

import { useQueryClient } from "@tanstack/react-query";
import { signInAnonymously } from "firebase/auth";
import { FC, useEffect, useState } from "react";
import { ForbiddenError, UnauthorizedError } from "src/libs/error";
import { auth } from "src/libs/firebase";
import { client } from "src/libs/graphqlClient";
import { CreateClaimsSchema } from "src/libs/server/types";
import { createUser } from "src/libs/server/user/createUser";
import { getUser } from "src/libs/server/user/getUser";

import { useGlobalState } from "src/store/global/globalStore";
import { useUserState } from "src/store/user/userState";

const TOKEN_KEY = process.env.NEXT_PUBLIC_TOKEN_KEY as string;

type Props = {
  children: React.ReactNode;
};

export const FirebaseAuth: FC<Props> = ({ children }) => {
  const setUser = useUserState((state) => state.setUser);
  const queryClient = useQueryClient();
  const setAuthLoading = useGlobalState((state) => state.setAuthLoading);
  const [_, setAuthError] = useState<null>(null);
  useEffect(() => {
    const unSubUser = auth.onAuthStateChanged(async (user) => {
      if (user) {
        setAuthLoading(true);
        const prevName = localStorage.getItem("user_name");
        const idTokenResult = await user.getIdTokenResult(true);
        const isHasClaims = idTokenResult.claims[TOKEN_KEY];

        if (isHasClaims) {
          try {
            const userData = await getUser(user.uid);

            const { users_by_pk } = userData;

            if (!users_by_pk) throw new ForbiddenError();

            const { photo_url, id, user_name } = users_by_pk;

            setUser({
              id,
              anonymous: user.isAnonymous,
              photo_url: photo_url ?? null,
              user_name: prevName ?? user_name,
              provider_user_name: user.displayName ?? null,
              isDefaultPhoto: false,
            });

            client.setHeader("authorization", `Bearer ${idTokenResult.token}`);

            setAuthLoading(false);

            return;
          } catch (error: any) {
            setAuthError(() => {
              throw new ForbiddenError();
            });
          }
        }

        try {
          const body: CreateClaimsSchema = {
            id: user.uid,
            isAnonymous: user.isAnonymous,
            refreshToken: user.refreshToken,
          };

          await fetch("/api/auth/setCustomClaims", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(body),
          });

          const newestToken = await auth.currentUser?.getIdToken(true);

          const userData = await createUser({
            id: user.uid,
            user_name: user.displayName ?? null,
            photo_url: user.photoURL ?? null,
          });

          const { insert_users_one } = userData.data;

          if (!insert_users_one) throw new UnauthorizedError();

          const { photo_url, id, user_name } = insert_users_one;

          setUser({
            id,
            anonymous: user.isAnonymous,
            photo_url: photo_url ?? null,
            user_name: prevName ?? user_name,
            provider_user_name: user.displayName ?? null,
            isDefaultPhoto: false,
          });

          client.setHeader("authorization", `Bearer ${newestToken}`);

          queryClient.invalidateQueries(["comments"]);
          queryClient.invalidateQueries(["replies"]);
          setAuthLoading(false);
        } catch (error: any) {
          setAuthError(() => {
            throw new UnauthorizedError();
          });
        }
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

  return <>{children}</>;
};
