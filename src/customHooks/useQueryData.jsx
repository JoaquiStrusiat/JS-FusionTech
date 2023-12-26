import { useQuery } from '@tanstack/react-query';

export default function useQueryData(URL) {
  const query = useQuery({
    queryKey: ['products'],
    queryFn: () => fetchData(URL),
  });

  return query;
}

export async function fetchData(url) {
  const res = await fetch(url);
  const data = await res.json();
  return data;
}