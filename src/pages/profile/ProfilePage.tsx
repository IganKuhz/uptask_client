import Loading from '@/components/Loading';
import ProfileForm from '@/components/Profile/ProfileForm';
import { useAuth } from '@/hooks/useAuth';

function ProfilePage() {
	const { data, isLoading } = useAuth();

	if (isLoading) return <Loading />;
	if (data)
		return (
			<>
				<ProfileForm data={data} />
			</>
		);
}
export default ProfilePage;
