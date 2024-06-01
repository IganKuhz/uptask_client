import Loading from '@/components/Loading';
import ProfilePassword from '@/components/Profile/ProfilePassword';
import { useAuth } from '@/hooks/useAuth';

function ProfilePasswordPage() {
	const { data, isLoading } = useAuth();

	if (isLoading) return <Loading />;
	if (data)
		return (
			<>
				<ProfilePassword />
			</>
		);
}

export default ProfilePasswordPage;
