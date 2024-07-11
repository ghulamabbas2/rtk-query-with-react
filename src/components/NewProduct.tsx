import React, { useEffect, useState } from "react";
import { useCreateProductMutation } from "../redux/api/productApi";

const NewProduct: React.FC = () => {
  const [name, setName] = useState("");
  const [price, setPrice] = useState(0);
  const [description, setDescription] = useState("");

  const [createProduct, { data, error, isLoading, isSuccess }] =
    useCreateProductMutation();

  useEffect(() => {
    if (error) alert(error);

    if (isSuccess) {
      alert("Product created successfully");
      setName("");
      setPrice(0);
      setDescription("");
    }
  }, [error, isSuccess]);

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    // Add logic to handle form submission here
    createProduct({ name, price, description });
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100">
      <div className="card">
        <div className="card-body">
          <h2 className="card-title">Create New Product</h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="name" className="form-label">
                Name
              </label>
              <input
                type="text"
                className="form-control"
                id="name"
                value={name}
                onChange={(event) => setName(event.target.value)}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="price" className="form-label">
                Price
              </label>
              <input
                type="number"
                className="form-control"
                id="price"
                value={price}
                onChange={(event) => setPrice(Number(event.target.value))}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="description" className="form-label">
                Description
              </label>
              <textarea
                className="form-control"
                id="description"
                rows={3}
                value={description}
                onChange={(event) => setDescription(event.target.value)}
              ></textarea>
            </div>
            <button type="submit" className="btn btn-primary">
              {isLoading ? "Creating" : "Create"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default NewProduct;
