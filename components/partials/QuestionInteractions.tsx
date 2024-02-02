"use client";
import {
  downvoteQuestion,
  saveTheQuestion,
  upvoteQuestion,
} from "@/lib/actions/user.action";
import React, { useState } from "react";
import { FaRegStar, FaStar } from "react-icons/fa";
import { BiUpvote, BiDownvote } from "react-icons/bi";
import { usePathname } from "next/navigation";

interface QuestionInteractionProps {
  question: string;
  userId: string;
}

const QuestionInteractions: React.FC<QuestionInteractionProps> = (params) => {
  const { question, userId } = params;
  const pathname = usePathname();
  const [questionSavedStatus, setQuestionSavedStatus] = useState(true);

  const questionObj = JSON.parse(question);
  const userIdObj = JSON.parse(userId);

  const isQuestionSaved = async function () {
    const response = await saveTheQuestion({
      userId: userIdObj,
      questionId: questionObj._id,
      path: pathname,
    });
    setQuestionSavedStatus(response);
  };

  async function upvoteQuestionHandler() {
    await upvoteQuestion({
      questionId: questionObj._id,
      authorId: userIdObj,
      path: pathname,
    });
  }

  async function downvoteQuestionHandler() {
    await downvoteQuestion({
      questionId: questionObj._id,
      authorId: userIdObj,
      path: pathname,
    });
  }

  return (
    <div className="flex items-center">
      <button
        onClick={upvoteQuestionHandler}
        className="mr-2 text-blue-500 hover:underline"
      >
        <BiUpvote />
      </button>
      <div className="px-1 text-xs mr-2 bg-slate-300 rounded-sm">
        {questionObj?.upvotes?.length}
      </div>
      <button
        onClick={downvoteQuestionHandler}
        className="mr-2 text-red-500 hover:underline"
      >
        <BiDownvote />
      </button>
      <div className="px-1 mr-2 text-xs bg-slate-300 rounded-sm">
        {questionObj?.downvotes?.length}
      </div>

      {questionSavedStatus ? (
        <button
          onClick={isQuestionSaved}
          className="ml-2 text-2xl text-green-600"
        >
          <FaStar />
        </button>
      ) : (
        <button
          onClick={isQuestionSaved}
          className="ml-2 text-2xl text-green-600"
        >
          <FaRegStar />
        </button>
      )}
    </div>
  );
};

export default QuestionInteractions;
