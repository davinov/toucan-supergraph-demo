import APPS_DATA from "./data/apps.json" assert { type: "json" };
import DATASETS from "./data/datasets.json" assert { type: "json" };

export interface VisualizationDocument {
  id: string;
  title: string;
  type: "BARCHART" | "LINECHART" | "TABLE";
  datasetId: string;
}

export interface DatasetDocument {
  appId: string;
  id: string;
  name: string;
  query: string;
}

export interface AppDocument {
  id: string;
  visualizations: VisualizationDocument[];
}

const APPS = APPS_DATA as AppDocument[];

export class AppsDataSource {
  list(): AppDocument[] {
    return APPS;
  }

  getById(id: string): AppDocument | undefined {
    return APPS.find((a) => a.id === id);
  }
}

export class DatasetsDataSource {
  listForAppId(appId): DatasetDocument[] {
    return DATASETS.filter((d) => d.appId === appId);
  }

  getById(id: string): DatasetDocument | undefined {
    return DATASETS.find((d) => d.id === id);
  }
}
