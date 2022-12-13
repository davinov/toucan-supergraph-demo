import { useQuery } from "@apollo/client";
import { gql } from "./generated/gql";
import { Link } from "react-router-dom";

const LIST_APPS = gql(`
  query ListApps($tenantId: ID!) {
    appsForTenant(tenantId: $tenantId) {
      url
      name
      id
    }
  }
`);

export function AppStore() {
  const { loading, error, data } = useQuery(LIST_APPS, {
    variables: { tenantId: "tenant-2" },
  });

  return (
    <div>
      <h1>Apps</h1>
      {loading ? (
        <>Loading...</>
      ) : error ? (
        <>Oh no! An error occurred</>
      ) : (
        <ul>
          {data &&
            data.appsForTenant.map((d) => (
              <li key={d.id}>
                <Link to={`app/${d.url}`}>{d.name}</Link>
              </li>
            ))}
        </ul>
      )}
    </div>
  );
}
