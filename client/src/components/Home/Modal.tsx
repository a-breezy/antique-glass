/* eslint-disable react/prop-types */
import { AiOutlineClose } from "react-icons/ai";

type ProductImage = {
  public_id: string;
  url: string;
};

type Item = {
  _id: number;
  title: string;
  description: string;
  condition: string;
  quantity: number;
  price: number;
  availability: boolean;
  productImage?: ProductImage;
};

type ModalProps = {
  item: Item;
  onClose: () => void;
};

export default function Modal({ item, onClose }: ModalProps) {
  return (
    <div
      className="fixed bg-black bg-opacity-60 top-0 left-0 right-0 bottom-0 z-50 flex justify-center items-center"
      onClick={onClose}
    >
      <div
        onClick={(event) => event.stopPropagation()}
        className="w-[600px] max-w-full h-[400px] bg-white rounded-xl p-4 flex flex-col relative overflow-auto"
      >
        <AiOutlineClose
          className="absolute right-6 top-6 text-3x1 text-red-600 cursor-pointer"
          onClick={onClose}
        />
        <div className="flex flex-col items-center gap-x-2">
          {item.productImage ? (
            <img
              src={item.productImage.url}
              alt={`${item.title} item for sale`}
              className="h-2/3 w-2/3"
            />
          ) : null}
          <h2 className="w-fit mt-1 px-4 py-1 bg-red-300 rounded-lg">
            {item.title}
          </h2>
        </div>
        <div className="flex lg:flex-row flex-col justify-between items-center gap-x-2">
          <h2 className="my-1">Price: ${item.price}</h2>
          <h2 className="my-1">Quantity: {item.quantity}</h2>
          <h2 className="my-1">
            Availability: {item.availability ? "available" : "not available"}
          </h2>
        </div>

        <div>
          <p className="my-2">{item.description}</p>
        </div>
      </div>
    </div>
  );
}
