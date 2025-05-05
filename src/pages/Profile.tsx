import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "../components/style";
import { useImageCompressor } from "../hooks/useImageCompressor";

const Profile = () => {
  const [newUser, setNewUser] = useState(true);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const [image, setImage] = useState<File | null>(null);
  const [username, setUsername] = useState<string>("");
  const [preview, setPreview] = useState<string>("");
  const navigate = useNavigate();
  
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImage(file);
      setPreview(URL.createObjectURL(file));
    }
  };
  
  const { compress } = useImageCompressor(); 
  const handleCompleteProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const email = localStorage.getItem("email");
    if (!email) {
      setLoading(false);
      setError("Not a valid user");
      return;
    }

    let avatarUrl = preview; // Default preview or existing one
    const redirect = newUser;

    try {
      if (image) {
        let imageToUpload: File = image;

        try {
          const compressed = await compress(image, {
            maxSizeMB: 1,
            maxWidthOrHeight: 800,
            useWebWorker: true,
          }, 15000);

          imageToUpload = compressed;
          const blobUrl = URL.createObjectURL(compressed);
          setPreview(blobUrl);
        } catch (compressionError) {
          console.warn("Compression failed. Proceeding with original image.",compressionError);
        }

        const formData = new FormData();
        formData.append("email", email);
        formData.append("file", imageToUpload);

        try {
          const uploadRes = await axios.post(
            "http://localhost:5000/api/crud/upload-avatar",
            formData,
            { timeout: 20000 }
          );

          avatarUrl = `${uploadRes.data.publicUrl}?t=${Date.now()}`; // cache busting
        } catch (uploadError) {
          if (axios.isAxiosError(uploadError)) {
            if (uploadError.code === "ECONNABORTED") {
              setError("Time limit exceeded for avatar upload");
            } else {
              setError(
                uploadError.response?.data?.message || "Avatar upload failed"
              );
            }
          } else {
            setError("Unknown error during avatar upload");
          }
          setLoading(false);
          return;
        }
      }

      // Save profile info to backend
      const profileRes = await axios.post(
        "http://localhost:5000/api/auth/complete-profile",
        {
          email,
          username,
          avatar: avatarUrl,
        },
        { timeout: 20000 }
      );

      localStorage.setItem("username", username);
      localStorage.setItem("profileCompleted", profileRes.data.profileCompleted);
      localStorage.setItem("avatar", avatarUrl);
      // console.log(avatarUrl);

      if (redirect) navigate("/dashboard");
      else setError("Profile Updated Successfully");
    } catch (err) {
      if (axios.isAxiosError(err)) {
        if (err.code === "ECONNABORTED") {
          setError("Time limit exceeded, try again!");
        } else {
          setError(err.response?.data?.message || "Profile update failed");
        }
      } else {
        setError("Unknown error occurred");
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const profileCompleted =
      localStorage.getItem("profileCompleted") === "true";
    if (profileCompleted) setNewUser(false);

    const userName = localStorage.getItem("username");
    if (userName) setUsername(userName);
    else setUsername("vistoria");

    const userProfile = localStorage.getItem("avatar");
    if (userProfile) setPreview(`${userProfile}?t=${new Date().getTime()}`);
    else setPreview("/avatar/avatar.jpg");
  }, []);

  return (
    <main
      className={`h-screen w-full bg-primary flex justify-center items-center`}
    >
      <div className="h-4/5 w-3/5 bg-secondary text-text flex flex-col items-center rounded-lg shadow-lg p-8">
        <h1 className="text-4xl font-bold">
          {newUser ? "Hey There," : "Your Profile"}
        </h1>
        <p className="text-lg mt-2">
          {newUser ? "Let's complete your profile" : "Update your profile"}
        </p>

        <form
          onSubmit={handleCompleteProfile}
          className="w-4/5 relative my-8 py-2 flex flex-col items-center gap-6"
        >
          {!newUser && (
            <button
              className="absolute top-2 right-4 text-xl cursor-pointer"
              onClick={() => navigate("/dashboard")}
            >
              {" "} X {" "}
            </button>
          )}

          {/* Profile Image */}
          <label htmlFor="fileInput" className="relative mt-8">
            <img
              src={preview}
              alt="profile-picture"
              className="w-48 h-48 object-cover rounded-full cursor-pointer border-2 border-gray-300 shadow-md"
            />
            <input
              type="file"
              id="fileInput"
              accept="image/*"
              className="hidden"
              onChange={handleImageChange}
            />
          </label>

          {/* Username Input */}
          <input
            type="text"
            placeholder="Enter username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-2/5 p-3 border rounded-md text-center focus:border-black focus:outline-none"
            required
          />

          {/* Submit Button */}
          <Button disabled={loading}>
            {loading ? "Saving..." : newUser ? "Complete" : "Update"}
          </Button>

          {/* Error Display */}
          {error && (
            <div className="text-text px-4 py-2 rounded flex items-center gap-4">
              <p>{error}</p>
              <Button
                onClick={() => setError("")}
                className="mt-2 bg-green-00 hover:bg-green-600"
              >
                OK
              </Button>
            </div>
          )}
        </form>
      </div>
    </main>
  );
};

export default Profile;
