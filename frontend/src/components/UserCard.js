import { Link } from "react-router-dom";

const UserCard = (props) => {
  return (
    <div>
      <div>
        <Link to={`/post/user/${props.id}`}>
          <div>
            <h2>{props.name}</h2>
            <h3>
              {props.posts.length} {props.posts.length === 1 ? "Post" : "Posts"}
            </h3>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default UserCard;
