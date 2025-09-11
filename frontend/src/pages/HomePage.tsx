import { useEffect, useState } from "react";
import * as api from "../services/api.js";
import Loader from "../components/Loader";

const HomePage = () => {
  const [error, setError] = useState("");
  const [posts, setPosts] = useState<IPost[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await api.getAllPosts();
        setPosts(response.data);
      } catch (error) {
        if (error instanceof Error) {
          setError("Failed to fetch posts: " + error.message);
        } else {
          setError("Failed to fetch posts: " + error);
        }
      } finally {
        setLoading(false);
      }
    };
    fetchPosts();
  }, []);

  if (error) {
    return <div> {error}</div>;
  }

  return <div>{loading ? <Loader /> : <>{posts}</>}</div>;
};

export default HomePage;
