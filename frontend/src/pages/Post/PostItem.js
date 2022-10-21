import { Link, useNavigate } from "react-router-dom";

const PostItem = (props) => {
  const apiBackendUrl = process.env.REACT_APP_BACKEND_URL;
  const navigate = useNavigate();
  const postId = props.id;

  const formSubmitHandler = async (event) => {
    event.preventDefault();
    try {
      const res = await fetch(`${apiBackendUrl}/api/post/${postId}`, {
        method: "DELETE",
      });

      const data = await res.json();

      // if response is not ok or fetch failed
      if (!res.ok) {
        throw new Error(data.message);
      }

      navigate("/");
    } catch (err) {
      console.log("Delete falied", err);
    }
  };

  return (
    <div>
      <h1>{props.title}</h1>
      <p>{props.description}</p>

      <h4>Creator: {props.creator}</h4>

      <div>
        <Link to={`/post/${props.id}`}>Edit</Link>
      </div>
      <form onSubmit={formSubmitHandler}>
        <button type="submit">Delete</button>
      </form>
    </div>
  );
};

export default PostItem;
