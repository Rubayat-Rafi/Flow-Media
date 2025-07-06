import useUsers from "../../../../hooks/useUsers";

const Subscription = () => {
  const [users] = useUsers();

  console.log(users)

  return (
    <div className="flex items-center justify-center h-screen">
      <div className="text-center">
        <h6 className="text-xl font-semibold mb-2">No Subscription Found</h6>
        <p className="text-gray-300">
          You do not have any active subscriptions.
        </p>
      </div>
    </div>
  );
};

export default Subscription;
