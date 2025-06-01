import PocketBase from "pocketbase";
import { Character, Class } from "../collections";

const pocketbaseUrl = import.meta.env.VITE_POCKETBASE_URL;

export const usePocketbase = () => {
  const pocketbase = new PocketBase(pocketbaseUrl);

  return {
    authStore: pocketbase.authStore,
    auth: async ({
      username,
      password,
    }: {
      username: string;
      password: string;
    }) => {
      return await pocketbase
        .collection("users")
        .authWithPassword(username, password);
    },
    class: {
      getList: async (): Promise<Class[]> => {
        const loggedUser = pocketbase.authStore.record;
        if (!loggedUser) throw new Error("User not authenticated");

        const listResult = await pocketbase
          .collection("class")
          .getList<Class>(1, 50, {
            sort: "-created",
          });
        return listResult.items;
      },
    },
    characters: {
      getList: async (): Promise<Character[]> => {
        const loggedUser = pocketbase.authStore.record;
        if (!loggedUser) throw new Error("User not authenticated");

        const listResult = await pocketbase
          .collection("characters")
          .getList<Character>(1, 50, {
            filter: `user = "${loggedUser.id}"`,
            sort: "-created",
          });
        return listResult.items;
      },
      create: async (character: Character) => {
        const loggedUser = pocketbase.authStore.record;
        if (!loggedUser) throw new Error("User not authenticated");

        return await pocketbase.collection("characters").create(character);
      },
    },
  };
};
