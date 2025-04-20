import React, { useEffect, useState } from "react";

const DriverProfile = () => {
  const [profile, setProfile] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await fetch("http://localhost:5000/api/drivers/profile/me", {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });

        const data = await res.json();

        if (res.ok) {
          setProfile(data);
        } else {
          setError(data.message || "Failed to load profile");
        }
      } catch (err) {
        setError("Error fetching profile");
      }
    };

    fetchProfile();
  }, []);

  if (error) return <p>{error}</p>;
  if (!profile) return <p>Loading...</p>;

  return (
    <div className="max-w-md mx-auto p-4 bg-white shadow-md rounded">
      <h2 className="text-xl font-bold mb-4">Driver Profile</h2>
      <p><strong>Name:</strong> {profile.name}</p>
      <p><strong>Email:</strong> {profile.email}</p>
      <p><strong>NIC:</strong> {profile.nic}</p>
      <p><strong>Address:</strong> {profile.address}</p>
      <p><strong>Age:</strong> {profile.age}</p>
      <p><strong>Gender:</strong> {profile.gender}</p>
    </div>
  );
};

export default DriverProfile;
