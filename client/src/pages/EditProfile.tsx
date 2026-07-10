import { useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

import { useAppContext } from "../context/AppContext";
import { updateUserProfile } from "../services/api";

import Card from "../components/ui/Card";
import Button from "../components/ui/Button";
import Input from "../components/ui/Input";
import type { ChangeEvent } from "react";
import type { ProfileFormData } from "../types";

const EditProfile = () => {
  const { user, setUser } = useAppContext();

  const navigate = useNavigate();

  const [form, setForm] = useState({
    
    username: user?.username || "",
    age: user?.age || 0,
    weight: user?.weight || 0,
    height: user?.height || 0,
    goal: (user?.goal || "maintain") as ProfileFormData["goal"],
    dailyCalorieIntake:
      user?.dailyCalorieIntake || 2000,
    dailyCalorieBurn:
      user?.dailyCalorieBurn || 400,
    profileImage:
      user?.profileImage ||
      `https://ui-avatars.com/api/?name=${user?.username}&background=10b981&color=fff`,
  });
const handleImageUpload = (
  e: ChangeEvent<HTMLInputElement>
) => {
  const file = e.target.files?.[0];

  if (!file) return;

  if (!file.type.startsWith("image/")) {
    toast.error("Please choose an image file");
    return;
  }

  const reader = new FileReader();

  reader.onload = () => {
    const img = new Image();

    img.onload = () => {
      const canvas = document.createElement("canvas");
      const maxSize = 512;
      const scale = Math.min(
        1,
        maxSize / Math.max(img.width, img.height)
      );

      canvas.width = Math.round(img.width * scale);
      canvas.height = Math.round(img.height * scale);

      const ctx = canvas.getContext("2d");

      if (!ctx) {
        toast.error("Unable to process image");
        return;
      }

      ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

      const profileImage = canvas.toDataURL("image/jpeg", 0.8);

    setForm((prev) => ({
      ...prev,
        profileImage,
    }));
    };

    img.src = String(reader.result);
  };

  reader.readAsDataURL(file);
};
  const saveProfile = async () => {
    if (!user) return;

    const userId = user._id || user.id;

    if (!userId) {
      toast.error("User ID is missing");
      return;
    }

    const updatedUser = await updateUserProfile(userId, form);

    localStorage.setItem("user", JSON.stringify(updatedUser));
    setUser(updatedUser);

    toast.success("Profile Updated");

    navigate("/profile");
  };

  return (
    <div className="max-w-4xl mx-auto p-6">

      <h1 className="text-3xl font-bold mb-6">
        Edit Profile
      </h1>

      <Card className="p-6 space-y-5">

        <div className="flex justify-center">
<div className="flex flex-col items-center gap-4">

    <img
        src={form.profileImage}
        className="w-36 h-36 rounded-full object-cover border-4 border-emerald-500 shadow-lg"
    />

    <label className="cursor-pointer bg-emerald-500 hover:bg-emerald-600 text-white px-4 py-2 rounded-lg">

        Change Photo

        <input
            type="file"
            accept="image/*"
            hidden
            onChange={handleImageUpload}
        />

    </label>

</div>
         
        </div>


        <Input
          label="Username"
          value={form.username}
          onChange={(v) =>
            setForm({
              ...form,
              username: String(v),
            })
          }
        />

        <Input
          label="Age"
          type="number"
          value={form.age}
          onChange={(v) =>
            setForm({
              ...form,
              age: Number(v),
            })
          }
        />

        <Input
          label="Weight"
          type="number"
          value={form.weight}
          onChange={(v) =>
            setForm({
              ...form,
              weight: Number(v),
            })
          }
        />

        <Input
          label="Height"
          type="number"
          value={form.height}
          onChange={(v) =>
            setForm({
              ...form,
              height: Number(v),
            })
          }
        />

        <Input
          label="Daily Calories"
          type="number"
          value={form.dailyCalorieIntake}
          onChange={(v) =>
            setForm({
              ...form,
              dailyCalorieIntake: Number(v),
            })
          }
        />

        <Input
          label="Daily Burn Goal"
          type="number"
          value={form.dailyCalorieBurn}
          onChange={(v) =>
            setForm({
              ...form,
              dailyCalorieBurn: Number(v),
            })
          }
        />

        <div>

          <label className="font-semibold">
            Goal
          </label>

          <select
            value={form.goal}
            onChange={(e) =>
              setForm({
                ...form,
                goal: e.target.value as ProfileFormData["goal"],
              })
            }
            className="w-full mt-2 p-3 rounded-xl border"
          >
            <option value="lose">
              Lose Weight
            </option>

            <option value="maintain">
              Maintain Weight
            </option>

            <option value="gain">
              Gain Muscle
            </option>

          </select>

        </div>

        <Button
          onClick={saveProfile}
          className="w-full"
        >
          Save Changes
        </Button>

      </Card>

    </div>
  );
};

export default EditProfile;
