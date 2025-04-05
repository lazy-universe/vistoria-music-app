import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Button } from "../components/style";

const Profile = () => {
  const [newUser, setNewUser] = useState(true);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const [image, setImage] = useState<File | null>(null);
  const [username, setUsername] = useState<string>("music is love");
  const [preview, setPreview] = useState<string>("/avatar/avatar-1.jpg");
  const navigate = useNavigate();

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImage(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleCompleteProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    
    const email = localStorage.getItem("email");
    if(!email){
      setLoading(false);
      throw new Error ("not a valid user");
    }
    let avatarUrl = preview; // Default avatar or existing one
    const redirect = newUser;

    const urlController = new AbortController();
    const urlTimeoutId = setTimeout(() => {
      urlController.abort(); // Abort the fetch request
      setError("Time limit exceeded for storing avatar, try again!");
      setLoading(false);
    }, 20000);

    const uploadController = new AbortController();
    const uploadTimeoutId = setTimeout(() => {
      uploadController.abort();
      setError("Time limit exceeded for storing details, try again!");
      setLoading(false);
    }, 20000)

    
    try {
      if (image) {
        // Step 1: Request a signed upload URL from the backend
        const oldAvatarUrl = localStorage.getItem("avatar") || "";
        const formData = new FormData();
        formData.append("email", email);
        formData.append("file", image);
        formData.append("oldAvatarUrl", oldAvatarUrl); // Pass the old avatar URL if needed
        const res = await fetch(
          "http://localhost:5000/api/crud/upload-avatar",
          {
            method: "POST",
            // headers: { "Content-Type": "application/json" },
            body: formData,
            signal : urlController.signal,
          }
        );
        clearTimeout(urlTimeoutId);

        const data = await res.json();
        if (!res.ok) throw new Error(data.message || data.error || "Failed to generate upload URL");        
        
        avatarUrl = data.publicUrl;
      }
      
      // Step 3: Save updated profile info to Firestore (or Supabase DB)
      const response = await fetch(
        "http://localhost:5000/api/auth/complete-profile",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, username, avatar: avatarUrl }),
          signal: uploadController.signal,
        }
      );
      clearTimeout(uploadTimeoutId);

      const responseData = await response.json();
      if (!response.ok)
        throw new Error(responseData.message || "Profile update failed");

      // Step 4: Update localStorage
      localStorage.setItem("username", username);
      localStorage.setItem("profileCompleted", responseData.profileCompleted);
      localStorage.setItem("avatar", avatarUrl);

      if (redirect) navigate("/dashboard");
      else setError("Profile Updated Successfully");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Please try again");
    } finally {
      setLoading(false);
      clearTimeout(urlTimeoutId);
      clearTimeout(uploadTimeoutId);
    }
  };

  useEffect(() => {
    const profileCompleted = localStorage.getItem("profileCompleted") === "true";
    if (profileCompleted) setNewUser(false);

    const userName = localStorage.getItem("username");
    if(userName) setUsername(userName);

    const userProfile = localStorage.getItem("avatar");    
    if(userProfile) setPreview(userProfile);
  }, []); 

  return (
    <main className="h-screen w-screen bg-primary flex justify-center items-center">
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
            <Link
              className="absolute top-2 right-4 text-xl cursor-pointer"
              to="/dashboard"
            >
              X
            </Link>
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
            {loading
              ? "Saving..."
              : newUser
              ? "Complete Profile"
              : "Update Profile"}
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
