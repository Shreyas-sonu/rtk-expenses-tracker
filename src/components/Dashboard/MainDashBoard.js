import React, { useEffect } from "react";
import AccountList from "./AccountList";
import AccountSummary from "./AccountSummary";
import { useDispatch, useSelector } from "react-redux";
import { getUserProfile } from "../../redux/slice/users/userSlice";

const MainDashBoard = () => {
  const dispatch = useDispatch();
  const {profile,loading,error} = useSelector(state => state?.users);
  useEffect(() => {
    dispatch(getUserProfile());
  }, [dispatch]);
  return loading ? (
    <h2 className="text-center text-blue-700">Loading...</h2>
  ) : error ? (
    <h2 className="text-center text-red-700">{error}</h2>
  ) : (
    <>
      <AccountSummary profile={profile} />
      <AccountList profile={profile} />
    </>
  );
};

export default MainDashBoard;
