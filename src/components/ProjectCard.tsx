import type React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import type { Project } from "../types";
import { EllipsisIcon, LoaderIcon } from "lucide-react";

const ProjectCard = ({
  gen,
  setGenerations,
  forCommunity = false,
}: {
  gen: Project;
  setGenerations: React.Dispatch<React.SetStateAction<Project[]>>;
  forCommunity?: boolean;
}) => {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div key={gen.id} className="mb-4 break-inside-avoid">
      <div className="bg-white/5 border border-white/10 rounded-xl overflow-hidden hover:border-white/20 transition group">

        {/* preview */}
        <div
          className={`${
            gen?.aspectRatio === "9:16"
              ? "aspect-[9/16]"
              : "aspect-video"
          } relative overflow-hidden`}
        >
          {/* Generated image */}
          {gen.generatedImage && (
            <img
              src={gen.generatedImage}
              alt={gen.productName}
              className={`absolute inset-0 w-full h-full object-cover transition duration-500 ${
                gen.generatedVideo
                  ? "group-hover:opacity-0"
                  : "group-hover:scale-105"
              }`}
            />
          )}

          {/* Generated video */}
          {gen.generatedVideo && (
            <video
              src={gen.generatedVideo}
              muted
              loop
              playsInline
              className="absolute inset-0 w-full h-full object-cover opacity-0 group-hover:opacity-100 transition duration-500"
              onMouseEnter={(e) => e.currentTarget.play()}
              onMouseLeave={(e) => e.currentTarget.pause()}
            />
          )}

          {/* Loading */}
          {!gen?.generatedImage && !gen?.generatedVideo && (
            <div className="absolute inset-0 w-full h-full flex flex-col items-center justify-center bg-black/20">
              <LoaderIcon className="size-7 animate-spin" />
            </div>
          )}

          {/* Status badges */}
          <div className="absolute left-3 top-3 flex gap-2 items-center">
            {gen.isGenerating && (
              <span className="text-xs px-2 py-1 bg-yellow-600/30 rounded-full">
                Generating
              </span>
            )}

            {gen.isPublished && (
              <span className="text-xs px-2 py-1 bg-green-600/30 rounded-full">
                Published
              </span>
            )}
          </div>

          {/* Action menu for My Generations only */}
          {!forCommunity && (
            <div className="absolute right-3 top-3 sm:opacity-0 group-hover:opacity-100 transition">
              
              <button
                onClick={() => setMenuOpen(!menuOpen)}
                className="bg-black/30 rounded-full"
              >
                <EllipsisIcon className="p-1 size-7" />
              </button>

              <div className="flex flex-col items-end w-32 text-sm">
                <ul
                  className={`${
                    menuOpen ? "block" : "hidden"
                  } text-xs overflow-hidden absolute right-0 top-8 w-40 bg-black/50 backdrop-blur text-white border border-gray-500/50 rounded-lg shadow-md mt-2 py-1 z-10`}
                >
                  <li
                    className="px-3 py-2 hover:bg-white/10 cursor-pointer"
                    onClick={() => navigate(`/result/${gen.id}`)}
                  >
                    View
                  </li>

                  <li
                    className="px-3 py-2 hover:bg-white/10 cursor-pointer"
                    onClick={() => setMenuOpen(false)}
                  >
                    Delete
                  </li>
                </ul>
              </div>
            </div>
          )}

          {/* Source images */}
          <div className="absolute right-3 bottom-3 flex">
            {gen.uploadedImages?.[0] && (
              <img
                src={gen.uploadedImages[0]}
                alt="product"
                className="w-16 h-16 object-cover rounded-full animate-float"
              />
            )}

            {gen.uploadedImages?.[1] && (
              <img
                src={gen.uploadedImages[1]}
                alt="model"
                className="w-16 h-16 object-cover rounded-full animate-float -ml-8"
                style={{ animationDelay: "3s" }}
              />
            )}
          </div>
        </div>

        {/* Details */}
        <div className="p-4">
          <div className="flex items-start justify-between gap-4">

            {/* Product name, date, aspect ratio */}
            <div className="flex-1">
              <h3 className="font-medium text-lg mb-1">
                {gen.productName}
              </h3>

              <p className="text-sm text-gray-400">
                Created: {new Date(gen.createdAt).toLocaleString()}
              </p>

              {gen.updatedAt && (
                <p className="text-xs text-gray-500 mt-1">
                  Updated: {new Date(gen.updatedAt).toLocaleString()}
                </p>
              )}
            </div>

            <div className="text-right">
              <div className="mt-2 flex flex-col items-end gap-1">
                <span className="text-xs px-2 py-1 bg-white/5 rounded-full">
                  Aspect: {gen.aspectRatio}
                </span>
              </div>
            </div>
          </div>

          {/* Product description */}
          {gen.productDescription && (
            <div className="mt-3">
              <p className="text-xs text-gray-400 mb-1">
                Description
              </p>

              <div className="text-sm text-gray-300 bg-white/3 p-2 rounded-md break-words">
                {gen.productDescription}
              </div>
            </div>
          )}

          {/* User prompt */}
          {gen.userPrompt && (
            <div className="mt-3">
              <p className="text-xs text-gray-400 mb-1">
                User Prompt
              </p>

              <div className="text-xs text-gray-300 bg-white/3 p-2 rounded-md break-words">
                {gen.userPrompt}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;