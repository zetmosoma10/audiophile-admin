import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import useUpdateProduct from "../../hooks/useUpdateProduct";
import Modal from "./Modal";
import Input from "./../Input";
import Button from "../Button";

const schema = z.object({
  price: z.coerce.number().min(1, "Price must be at least 1"),
  stock: z.coerce.number().min(1, "Stock must be at least 1"),
  discount: z.coerce.number().min(0, "Discount cannot be negative"),
});

const EditProductModal = ({ closeProductModal, product }) => {
  const {
    register,
    handleSubmit,
    formState: { errors, dirtyFields },
  } = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      price: product?.price,
      stock: product?.stock,
      discount: product?.discount,
    },
  });

  const [serverError, setServerError] = useState(null);
  const { mutate, isPending } = useUpdateProduct();

  const onSubmit = (data) => {
    data._id = product._id;

    mutate(data, {
      onSuccess: (data) => closeProductModal(),
      onError: (error) => {
        const errorMessage =
          error?.response?.data?.message || "Something went wrong";
        setServerError(errorMessage);
      },
    });
  };

  return (
    <Modal closeModal={closeProductModal}>
      <div className="p-3">
        <form onSubmit={handleSubmit(onSubmit)}>
          <h3 className="text-xl font-bold">Edit {product.name}</h3>
          {serverError && (
            <p className="pt-3 text-sm font-bold text-center text-red-500">
              {serverError}
            </p>
          )}
          <div className="mt-4 space-y-3">
            <Input
              id="price"
              label="Price"
              type="number"
              errors={errors?.price}
              register={register}
            />
            <Input
              id="stock"
              label="Stock"
              type="number"
              errors={errors?.stock}
              register={register}
            />
            <div>
              <label
                htmlFor="discount"
                className="font-bold text-[12px] tracking-[0.21px] "
              >
                Discount
              </label>
              <select
                {...register("discount")}
                className="block w-full indent-6 pb-[19px] pt-[18px] font-semibold text-sm mt-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                {["0", "15", "25", "40", "50"].map((val) => (
                  <option key={val} value={val}>
                    {val}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div className="flex items-center justify-end mt-5 space-x-3">
            <Button onClick={closeProductModal} className="btn-md btn-danger">
              Cancel
            </Button>

            <Button
              disabled={isPending || Object.keys(dirtyFields).length === 0}
              className="btn-md btn-dark"
            >
              {isPending ? "Submit..." : "Submit"}
            </Button>
          </div>
        </form>
      </div>
    </Modal>
  );
};

export default EditProductModal;
