import { Link } from "react-router-dom";

const UserCard = (props) => {
  return (
    <div>
      <Link to={`/post/user/${props.id}`}>
        <div className=" border-neutral-900 border-2 rounded-sm py-3 px-5 w-72 whitespace-normal break-all hover:bg-gray-800 hover:text-neutral-100">
          <h2 className="text-xl font-semibold mb-3">{props.name}</h2>
          <h3>
            {props.posts.length} {props.posts.length === 1 ? "Post" : "Posts"}
          </h3>
        </div>
      </Link>
    </div>
  );
};

export default UserCard;
