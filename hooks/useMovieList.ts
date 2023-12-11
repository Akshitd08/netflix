import useSwr from 'swr'

import fetcher from '../lib/fetcher';

const useMoviesList = () => {
  const { data, error, isLoading, mutate } = useSwr('/api/movies', fetcher,
  {
    revalidateIfStale: false,
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
  });
  return {
    data,
    error,
    isLoading,
    mutate
  }
};

export default useMoviesList;
