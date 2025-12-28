import { useForm } from "react-hook-form";
import axios from "axios";
import { useRouter } from "next/router";

export default function AddSchool() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm();

  const router = useRouter();

  const onSubmit = async (data) => {
    try {
      const formData = new FormData();

      formData.append("name", data.name);
      formData.append("address", data.address);
      formData.append("city", data.city);
      formData.append("state", data.state);
      formData.append("contact", data.contact);
      formData.append("email_id", data.email_id);
      formData.append("image", data.image[0]);

      await axios.post("/api/addSchool", formData, {
        headers: {
          "Content-Type": "multipart/form-data"
        }
      });

      reset();
      router.push("/showSchool"); // ✅ redirect after success

    } catch (error) {
      console.error(error);
      alert("❌ Failed to add school");
    }
  };

  return (
    <div className="form">
      <h2>Add School</h2>

      <form onSubmit={handleSubmit(onSubmit)}>
        <input
          type="text"
          placeholder="School Name"
          {...register("name", { required: "Name is required" })}
        />
        {errors.name && <p>{errors.name.message}</p>}

        <input
          type="text"
          placeholder="Address"
          {...register("address", { required: true })}
        />

        <input
          type="text"
          placeholder="City"
          {...register("city", { required: true })}
        />

        <input
          type="text"
          placeholder="State"
          {...register("state", { required: true })}
        />

        <input
          type="number"
          placeholder="Contact Number"
          {...register("contact", {
            required: true,
            minLength: { value: 10, message: "Minimum 10 digits" }
          })}
        />

        <input
          type="email"
          placeholder="Email"
          {...register("email_id", {
            required: "Email is required",
            pattern: {
              value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
              message: "Invalid email"
            }
          })}
        />
        {errors.email_id && <p>{errors.email_id.message}</p>}

        <input
          type="file"
          accept="image/*"
          {...register("image", { required: "Image is required" })}
        />
        {errors.image && <p>{errors.image.message}</p>}

        <button type="submit">Add School</button>
      </form>
    </div>
  );
}
