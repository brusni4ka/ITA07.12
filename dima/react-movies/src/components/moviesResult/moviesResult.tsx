import React from "react";

interface MoviesResultProps {
  total: number;
  loading?: boolean;
}

const MoviesResult = ({ total, loading }: MoviesResultProps) => {
  if (total && !loading) {
    return <span className="">{total} movies was found</span>;
  }
  return null;
};

export default MoviesResult;
