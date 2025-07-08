import usePricing from "../../../hooks/usePricing";
import toast from "react-hot-toast";
import LoadingSpinner from "../../../components/Shared/LoadingSpinner";
import { FaEdit } from "react-icons/fa";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useState } from "react";
import PricingUpdate from "../../../components/Form/PricingUpdate";

const Pricing = () => {
  const [pricing, isLoading, refetch] = usePricing();
  const [openModal, setOpenModal] = useState(false);
  const [selectedPrice, setSelectedPice] = useState(null);
  const axiosSecure = useAxiosSecure();

  const handleDeletePrice = (id) => {
    toast.custom((t) => (
      <div className="bg-white p-2 rounded shadow-lg flex flex-col md:flex-row items-center gap-3">
        <span className="text-[var(--background)]">
          Are you sure you want to delete?
        </span>
        <div className="flex gap-2 mt-2">
          <button
            className="bg-red-500 text-white px-2 py-1 rounded"
            onClick={async () => {
              toast.dismiss(t.id);
              await axiosSecure.delete(`/api/pricing/delete/${id}`);
              toast.success("Deleted successfully!");
              refetch();
            }}
          >
            Delete
          </button>
          <button
            className="bg-green-500 px-2 py-1 rounded"
            onClick={() => toast.dismiss(t.id)}
          >
            Cancel
          </button>
        </div>
      </div>
    ));
  };

  if (isLoading) return <LoadingSpinner />;

  return (
    <div>
      <h4 className="text-start uppercase font-semibold text-2xl my-10">
        Subscription plans
      </h4>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {pricing &&
          pricing.map((price) => (
            <div
              key={price?._id}
              className="border rounded-lg p-5 shadow-md bg-[var(--secondary)] hover:shadow-lg transition-shadow duration-300"
            >
              <div className="flex justify-between items-start">
                <div>
                  <h2 className="text-xl font-bold ">{price.passName}</h2>
                  <p className="text-sm ">{price.days} Days</p>
                  <p className="text-sm ">{price.device} Device</p>
                  {price.value && (
                    <span className="inline-block mt-2 text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded">
                      {price.value}
                    </span>
                  )}
                </div>
                <div className="text-right">
                  <div className="mb-4 flex justify-end gap-3 ">
                    <button
                      onClick={() => {
                        setOpenModal(true);
                        setSelectedPice(price);
                      }}
                      className="transition-colors duration-300 ease-in"
                    >
                      <FaEdit className="text-lg text-green-500 hover:text-green-700" />
                    </button>

                    <button
                      className="text-red-500 hover:text-red-700 transition-colors"
                      onClick={() => handleDeletePrice(price?._id)}
                      title="Delete event"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                        />
                      </svg>
                    </button>
                  </div>

                  {price.regularPrice && (
                    <p className="text-sm text-gray-400 line-through">
                      ${price.regularPrice}
                    </p>
                  )}
                  <p className="text-lg font-semibold text-green-600">
                    ${price.offerPrice}
                  </p>
                  {price.discount && (
                    <p className="text-xs text-red-500 mt-1">
                      {price.discount} Offer
                    </p>
                  )}
                </div>
              </div>
            </div>
          ))}
      </div>

      {openModal && selectedPrice && (
        <PricingUpdate
          setOpenModal={setOpenModal}
          selectedPrice={selectedPrice}
          refetch={refetch}
        />
      )}
    </div>
  );
};

export default Pricing;
