"use client";
import { useGetUserQuery } from "@/store/features/user/userApiSlice";

export default function Profile() {
  const { data: user, isLoading, isError, error } = useGetUserQuery();

  if (!user)
    return (
      <div className="flex min-h-screen flex-col items-center justify-between p-24">
        <h1>This page required authentication</h1>
      </div>
    );

  let content = null;

  if (isLoading) {
    content = (
      <div className="flex min-h-screen flex-col items-center justify-between p-24">
        Loading...
      </div>
    );
  } else if (isError) {
    content = (
      <div className="flex min-h-screen flex-col items-center justify-between p-24">
        Error: {error.message}
      </div>
    );
  } else {
    content = (
      <div className="flex min-h-screen flex-col items-center justify-center p-24">
        <h1 className="text-3xl">Profile</h1>
        <div className="my-3">
          <p className="text-xl">Name: {user.data.name}</p>
          <p className="text-xl">Gender: {user.data.gender}</p>
          <p className="text-xl">ID: {user.data.studentCardId}</p>
        </div>
      </div>
    );
  }

  return content;
}
