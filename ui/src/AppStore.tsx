import { useQuery } from "@apollo/client";
import { gql } from './generated/gql';

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
          {data && data.appsForTenant.map(
            (d) => (
              <li key={d.id}>
                <a href={d.url}>{d.name}</a>
              </li>
            )
          )}
        </ul>
      )}
    </div>
  );
}
