import { ChangeEvent } from "react";
import { Dispatch, SetStateAction } from "react";

type FormData = {
  title: string;
  description: string;
  condition: string;
  quantity: number;
  price: number;
  vendor: string;
  availability: boolean;
  // ! change when finished testing
  productImage: any;
  // productImage: File | null;
};

type FormDataProps = {
  formData: FormData;
  setFormData: Dispatch<SetStateAction<FormData>>;
  message: string;
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
};

export default function ProductForm({
  formData,
  setFormData,
  message,
  handleSubmit,
}: FormDataProps) {
  const handleChange = (
    e:
      | ChangeEvent<HTMLInputElement>
      | ChangeEvent<HTMLTextAreaElement>
      | ChangeEvent<HTMLSelectElement>
  ) => {
    const target = e.target as HTMLInputElement | HTMLTextAreaElement;
    let value = target.value;

    if (target.id == "quantity" || target.id == "price") {
      let intVal = parseInt(value);
      setFormData({ ...formData, [target.id]: intVal });
    }
    setFormData({ ...formData, [target.id]: value });
  };

  const handleSelectChange = (e: ChangeEvent<HTMLInputElement>) => {
    const isAvailable = e.target.value === "true";
    setFormData({ ...formData, availability: isAvailable });
  };

  const handleImage = (e: ChangeEvent<HTMLInputElement>) => {
    setFileToBase(e.target.files?.[0])
    // setFormData({ ...formData, productImage: e.target.files?.[0] || null });
  };

  const setFileToBase = (file: any) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    console.log(reader);
    reader.onloadend = () => {
      setFormData({ ...formData, productImage: reader.result });
    };
  };

  return (
    <div className="p-4">
      <h1 className="text-xl my-4 flex place-content-center">Edit Glass</h1>
      {message == "" ? (
        <form
          className="flex flex-col border-2 border-sky-400 rounded-xl p-4 mx-auto w-5/6 lg:w-2/3"
          method="post"
          encType="multipart/form-data"
          onSubmit={handleSubmit}
        >
          <div className="my-4">
            <label className="text-xl mr-4 text-gray-500">Title</label>
            <input
              type="text"
              id="title"
              value={formData.title}
              onChange={handleChange}
              className="border-2 border-gray-500 px-4 py-2 w-full"
            />
          </div>
          <div className="my-4">
            <label className="text-xl mr-4 text-gray-500">Description</label>
            <textarea
              id="description"
              value={formData.description}
              onChange={handleChange}
              rows={4}
              className="border-2 border-gray-500 px-4 py-2 w-full"
            />
          </div>
          <div className="my-4 flex justify-between">
            <label className="text-xl mr-4 text-gray-500" htmlFor="condition">
              Condition
            </label>
            <select
              name="condition"
              id="condition"
              value={formData.condition}
              onChange={handleChange}
              className="border-2 border-grey-500 w-1/2 rounded-md"
            >
              <option value="acceptable">Acceptable</option>
              <option value="good">Good</option>
              <option value="great">Great</option>
              <option value="like new">Like new</option>
            </select>
          </div>
          <div className="my-4">
            <label className="text-xl mr-4 text-gray-500">Quantity</label>
            <input
              type="number"
              id="quantity"
              value={formData.quantity}
              onChange={handleChange}
              className="border-2 border-gray-500 px-4 py-2 w-full"
            />
          </div>
          <div className="my-4">
            <label className="text-xl mr-4 text-gray-500">Price</label>
            <input
              type="number"
              id="price"
              value={formData.price}
              onChange={handleChange}
              className="border-2 border-gray-500 px-4 py-2 w-full"
            />
          </div>
          <div className="my-4 flex items-center justify-around">
            <div>
              <label className="text-l mr-4 text-gray-500" htmlFor="available">
                Available
              </label>
              <input
                type="radio"
                id="available"
                value="true"
                name="availability"
                defaultChecked={formData.availability}
                onChange={handleSelectChange}
                className="border-2 border-gray-500 px-4 py-2"
              />
            </div>
            <div>
              <label
                className="text-l mr-4 text-gray-500 text-center"
                htmlFor="not available"
              >
                Not Available
              </label>
              <input
                type="radio"
                id="not-available"
                value="false"
                name="availability"
                checked={!formData.availability}
                onChange={handleSelectChange}
                className="border-2 border-gray-500 px-4 py-2"
              />
            </div>
          </div>
          <div className="my-4 flex items-center justify-around">
            Images
            <input
              type="file"
              accept=".png, .jpg, .jpeg"
              name="productImage"
              //! have to search how to deal with image files in react
              // value={formData.productImage}
              onChange={handleImage}
            />
          </div>
          <button className="p-2 bg-sky-300 m-8" type="submit">
            Save
          </button>
        </form>
      ) : (
        <div className="flex flex-col items-center border-2 border-sky-400 rounded-xl p-8 mx-auto w-5/6 lg:w-2/3">
          {message}
        </div>
      )}
    </div>
  );
}
