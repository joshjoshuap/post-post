import { Link } from "react-router-dom";

const PostCard = (props) => {
  return (
    <div className="flex flex-col justify-between border-neutral-900 border-2 rounded-sm py-3 px-5 w-72 whitespace-normal break-all">
      <div>
        <h1 className="text-xl font-semibold mb-3">{props.title}</h1>
      </div>

      <div className="">
        <h4 className="text-blue-700">Posted by: {props.user}</h4>

        <Link to={`/post/${props.id}`}>
          <div className="bg-gray-800 text-neutral-100 text-center py-2 mt-2">
            View
          </div>
        </Link>
      </div>
    </div>
  );
};

export default PostCard;
