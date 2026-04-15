import { TrapsMap } from "../components/features/TrapsMap";
import { useTrapsMapData } from "../hooks/useTrapsMapData";

const ManageTrapsPage = () => {
  const { traps, loading, error } = useTrapsMapData();

  return <TrapsMap traps={traps} loading={loading} error={error} />;
};

export default ManageTrapsPage;
