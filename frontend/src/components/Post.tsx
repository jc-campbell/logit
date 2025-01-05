import clsx from "clsx";
import { memo } from "react";

export const PostPreview = memo(
  ({
    content,
    imgSrc,
    profilePic,
    author,
    numLikes,
    numComments,
    forecast
  }: {
    content: string;
    profilePic: string;
    imgSrc?: string;
    author: string;
    numLikes: number;
    numComments: number;
    forecast?: React.ReactNode;
  }) => {
    return (
      <div
        className={clsx(
          "border-border dark:border-border-dark relative mt-2 border-b p-1 pl-14 pr-3"
        )}
      >
        {/* Profile Picture */}
        <img
          src={profilePic}
          alt={`Profile Picture for ${author}`}
          className="absolute left-2 top-2 size-10 rounded-full"
        />
        {/* Author */}
        <div className="font-bold">@{author}</div>
        {/* Content */}
        <p className="whitespace-pre-wrap">{content}</p>
        {/* Image */}
        {imgSrc && (
          <img
            src={imgSrc}
            alt={`Post for ${author}`}
            className="mt-2 w-full rounded-lg"
          />
        )}
        {/* Forecast Preview (if given) */}
        {forecast && forecast}
        {/* Like, Share, Comment Buttons */}
        <div className="mt-2 flex justify-between">
          <button className="flex items-center">
            <span className="material-symbols-outlined mr-1 text-xl">
              favorite
            </span>
            <span className="text-sm">{numLikes}</span>
          </button>
          <button className="flex items-center">
            <span className="material-symbols-outlined mr-1 text-xl">
              mode_comment
            </span>
            <span className="text-sm">{numComments}</span>
          </button>
          <button className="flex items-center">
            <span className="material-symbols-outlined mr-1 text-xl">send</span>
          </button>
          <button className="flex items-center">
            <span className="material-symbols-outlined mr-1 text-xl">
              bookmark
            </span>
          </button>
        </div>
      </div>
    );
  }
);
