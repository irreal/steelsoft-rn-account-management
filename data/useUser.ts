import useSWR from "swr";
import { getUserDetails } from "../services/auth";

export default function useUser() {
    const { data, mutate, error } = useSWR("user", getUserDetails);

    const loading = !data && !error;
    const loggedOut = data && data.user === null;

    return {
        loading,
        loggedOut,
        user: data?.user,
        mutate
    };
}
