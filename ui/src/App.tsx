import { useQuery } from "@apollo/client";
import { useParams } from "react-router";
import { Outlet } from "react-router-dom";
import { gql } from "./generated/gql";

const APP_DETAILS = gql(`
  query AppByURL($appUrl: String!) {
    appByURL(url: $appUrl) {
      name
      visualizations {
        id
        title
      }
    }
  }
`);

export function App() {
  const { appUrl } = useParams();

  if (!appUrl) {
    return <div>Error: invalid URL!</div>;
  }

  const { loading, error, data } = useQuery(APP_DETAILS, {
    variables: { appUrl: appUrl },
  });

  if (loading) {
    return <>Loading...</>;
  }

  const app = data?.appByURL;

  if (error || !app) {
    return <>Oh no! An error occurred</>;
  }

  return (
    <>
      <h1>{app.name}</h1>
      <ul>
        {app.visualizations.map((v) => (
          <li key={v.id}>{v.title}</li>
        ))}
      </ul>
      <Outlet />
    </>
  );
}
