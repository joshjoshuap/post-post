import { Link } from "react-router-dom";

const PostCard = (props) => {
  return (
    <div>
      <Link to={`/post/${props.id}`}>
        <div className="bg-neutral-50 border-neutral-900 border-2 rounded-sm py-3 px-5 w-72 whitespace-normal break-all hover:bg-gray-800 hover:text-neutral-100">
          <h1 className="text-xl font-semibold mb-5">{props.title}</h1>

          <h4 className="text-blue-600">
            Posted by: {props.user}
          </h4>
        </div>
      </Link>
    </div>
  );
};

export default PostCard;
