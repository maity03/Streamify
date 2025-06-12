import { useEffect, useState } from "react";
import axios from "axios";
import FriendCard from "../components/FriendCard";

const FriendsPage = () => {
  const [friends, setFriends] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFriends = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/users/friends", {
          withCredentials: true,
        });
        console.log("Fetched friends:", res.data); // ✅ Check this
        setFriends(res.data || []);
      } catch (err) {
        console.error(
          "Error fetching friends:",
          err.response?.data || err.message
        );
      } finally {
        setLoading(false);
      }
    };

    fetchFriends();
  }, []);

  if (loading) return <p className="p-4">Loading friends...</p>;

  return (
    <div className="p-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {friends.length > 0 ? (
        friends.map((friend) => <FriendCard key={friend._id} friend={friend} />)
      ) : (
        <p>No friends found.</p>
      )}
    </div>
  );
};

export default FriendsPage;
