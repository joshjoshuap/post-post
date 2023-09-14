import { Link } from "react-router-dom";
import { Card, CardHeader } from "@nextui-org/react";

const UserCard = (props) => {
  return (
    <div>
      <Link to={`/post/user/${props.id}`}>
        <Card className="px-5 py-3 border-2 rounded shadow-lg w-46 border-cyan-600 hover:bg-neutral-900 hover:text-neutral-50 hover:border-cyan-500">
          <CardHeader className="flex gap-3">
            <div className="flex flex-col">
              <h2 className="mb-3 text-xl font-semibold">{props.name}</h2>
              <h3>
                {props.posts.length}{" "}
                {props.posts.length === 1 ? "Post" : "Posts"}
              </h3>
            </div>
          </CardHeader>
        </Card>
      </Link>
    </div>
  );
};

export default UserCard;
