import { useQuery } from "@apollo/client";
import { useParams } from "react-router";
import { gql } from "./generated/gql";

const VISUALIZATION = gql(`
  query VisualizationById($appUrl: String!, $visualizationId: ID!) {
    visualization(appUrl: $appUrl, visualizationId: $visualizationId) {
      id
      title
      type
      dataset {
        id
        name
        query
      }
    }
  }
`);

export function Visualization() {
  const { appUrl, visualizationId } = useParams();
  if (!appUrl || !visualizationId) {
    return <>Error: Invalid URL</>
  }

  const { loading, error, data } = useQuery(VISUALIZATION, {
    variables: { appUrl, visualizationId },
  });

  if (loading) {
    return <>Loading...</>;
  }

  const visualization = data?.visualization;
  if (error || !visualization) {
    return <>Oh no! An error occurred</>;
  }

  return (
    <>
      <h2>{visualization.title}</h2>
      <p>{ visualization.type } of { visualization.dataset.name }</p>
    </>
  );
}
