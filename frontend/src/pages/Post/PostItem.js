import { Link } from "react-router-dom";

const PostItem = (props) => {
  return (
    <div>
      <h1>{props.title}</h1>
      <p>{props.description}</p>

      <h4>Creator: {props.creator}</h4>

      <div>
        <Link to={`/post/${props.id}`}>Edit</Link>
      </div>
    </div>
  );
};

export default PostItem;
