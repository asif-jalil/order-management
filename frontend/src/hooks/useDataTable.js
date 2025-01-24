import { useCallback, useEffect, useState } from "react";
import useApi from "./useApi";

const useDataTable = ({ endpoint, limit = 10, filters, path = "items" }) => {
  const [data, setData] = useState([]);
  const [result, setResult] = useState();
  const api = useApi();
  const [meta, setMeta] = useState({
    currentPage: 1,
    pageCount: 1,
    totalCount: 0,
  });
  const [loading, setLoading] = useState(false);
  const [perPage, setPerPage] = useState(limit);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState(filters);

  const fetchData = useCallback(
    async (params) => {
      setLoading(true);
      setPerPage(params.perPage);
      setSearch(params.search);
      setFilter(params.filter);

      try {
        const response = await api.get(endpoint, { params });
        const { [path]: items, meta } = response.data.data;

        setResult(response.data);
        setData(items);
        if (meta) setMeta(meta);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    },
    [endpoint]
  );

  const getRequestQuery = useCallback(
    (overrides = {}) => {
      const {
        perPage: overridePerPage,
        page: overridePage,
        ...rest
      } = overrides;

      return {
        search,
        perPage: overridePerPage || perPage,
        page: overridePage || meta.currentPage,
        filter,
        ...rest,
      };
    },
    [search, perPage, meta.currentPage, filter]
  );

  useEffect(() => {
    fetchData(getRequestQuery({}));
  }, [fetchData]);

  const reloadData = useCallback(() => {
    fetchData(getRequestQuery({}));
  }, [fetchData]);

  return {
    result,
    data,
    loading,
    meta,
    perPage,
    search,
    filter,
    reloadData,
    fetchData,
    getRequestQuery,
  };
};

export default useDataTable;
