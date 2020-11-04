import useSWR from "swr";

import { usersFetcher } from "../services/users";

export default function useUsers() {
    const { data, mutate, error } = useSWR("api_users", usersFetcher);

    const loading = !data && !error;
    const loggedOut = error;

    return {
        loading,
        loggedOut,
        user: data,
        mutate
    };
}
