import { Card, CardHeader } from "@nextui-org/react";
import { Link } from "react-router-dom";

const PostCard = (props) => {
  return (
    <div>
      <Link to={`/post/${props.id}`}>
        <Card className="px-5 py-3 border-2 rounded shadow-lg w-46 border-cyan-600 hover:bg-neutral-900 hover:text-neutral-50 hover:border-cyan-500">
          <CardHeader className="flex gap-3">
            <div className="flex flex-col">
              <p className="text-xl font-semibold">{props.title}</p>
              <p className="text-sm text-gray-500">Posted by: {props.user}</p>
            </div>
          </CardHeader>
        </Card>
      </Link>
    </div>
  );
};

export default PostCard;
