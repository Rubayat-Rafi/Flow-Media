const LoadingSpinner = () => {
  return (
    <div className=" fixed right-0 left-0 bottom-0 top-0 flex items-center justify-center h-screen">
      <span className="loading loading-infinity loading-xl"></span>
    </div>
  );
};

export default LoadingSpinner;
