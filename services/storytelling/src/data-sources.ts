import APPS_DATA from "./data/apps.json" assert { type: "json" };
import DATASETS from "./data/datasets.json" assert { type: "json" };
import TENANTS from "./data/tenants.json" assert { type: "json" };

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
  name: string;
  url: string;
  visualizations: VisualizationDocument[];
  tenantId: string;
}

export interface TenantDocument {
  id: string;
  name: string;
}

const APPS = APPS_DATA as AppDocument[];

export class AppsDataSource {
  list(): AppDocument[] {
    return APPS;
  }

  getById(id: string): AppDocument | undefined {
    return APPS.find((a) => a.id === id);
  }

  getByURL(url: string): AppDocument | undefined {
    return APPS.find((a) => a.url === url);
  }

  getByTenantId(tenantId: string): AppDocument[] {
    return APPS.filter((a) => a.tenantId === tenantId);
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

export class TenantsDataSource {
  list(): TenantDocument[] {
    return TENANTS;
  }

  getById(id: string): TenantDocument | undefined {
    return TENANTS.find((t) => t.id === id);
  }
}
