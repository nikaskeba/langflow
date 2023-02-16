import {
  ArrowUpRightIcon,
  TrashIcon,
  PlayIcon,
} from "@heroicons/react/24/outline";
import { Handle, Position } from "reactflow";
import Dropdown from "../../components/dropdownComponent";
import Input from "../../components/inputComponent";
import { isValidConnection, nodeColors, nodeIcons, snakeToNormalCase } from "../../utils";
import Tooltip from "../../components/TooltipComponent";
import { useEffect } from "react";

export default function GenericNode({ data }) {
  const Icon = nodeIcons[data.type];
  return (
    <div className="prompt-node relative bg-white w-96 rounded-lg solid border flex flex-col justify-center">
      <div className="w-full flex items-center justify-between p-4 gap-8 bg-gray-50 border-b ">
        <div className="flex items-center gap-4 text-lg">
          <Icon
            className="w-10 h-10 p-1 text-white rounded"
            style={{ background: nodeColors[data.type] }}
          />
          {data.name}
        </div>
        <button onClick={data.onDelete}>
          <TrashIcon className="w-6 h-6 hover:text-red-500"></TrashIcon>
        </button>
      </div>

      <div className="w-full p-5 h-full">
        <div className="w-full text-gray-500 text-sm">
          {data.node.description}
        </div>
        {Object.keys(data.node.template).map((t, idx) => (
          <div key={idx} className="w-full mt-5">
            <Tooltip title={t + ": " + data.node.template[t].type + (data.node.template[t].list ? " list" : "") + (data.node.template[t].required ? " (required)" : "")}>
              <Handle
                type="source"
                position={Position.Left}
                id={data.node.template[t].type + "|" + t + "|" + data.id}
                isValidConnection={(connection) => isValidConnection(data,connection)}
                className="ml-1 bg-transparent border-solid border-l-8 border-y-transparent border-y-8 border-r-0 rounded-none"
                style={{
                  borderLeftColor: (nodeColors[(data.types[data.node.template[t].type] ?? data.node.template[t].type)]) ?? "gray",
                  marginTop: idx * 30 - 50 + "px",
                }}
              ></Handle>
            </Tooltip>
          </div>
        ))}
        <div className="w-full mt-5"></div>
      </div>
      <Tooltip title={"Output: " + data.name}>
        <Handle
          type="target"
          position={Position.Right}
          id={data.name}
          isValidConnection={(connection) => isValidConnection(data,connection)}
          className="-mr-1 bg-transparent border-solid border-l-8 border-y-transparent border-y-8 border-r-0 rounded-none"
          style={{ borderLeftColor: nodeColors[data.type] }}
        ></Handle>
      </Tooltip>
    </div>
  );
}