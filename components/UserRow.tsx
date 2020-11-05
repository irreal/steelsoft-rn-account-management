import { User } from "../interfaces";
type Props = {
    user: User
}
const UserRow = ({ user }: Props) => {
    if (!user) {
        return <p>unknown</p>
    }
    return (
        <p>{user.email} - admin: {user.admin ? 'DA' : 'NE'}</p>
    );
}

export default UserRow