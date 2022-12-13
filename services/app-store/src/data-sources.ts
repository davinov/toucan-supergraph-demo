import APPS from "./data/apps.json" assert { type: "json" };
import TENANTS from "./data/tenants.json" assert { type: "json" };

export type AppDocument = {
  id: string;
  name: string;
  url: string;
  tenantId: string;
};

export type TenantDocument = {
  id: string;
  name: string;
};

export class AppsDataSource {
  list(): AppDocument[] {
    return APPS;
  }

  getById(id: string): AppDocument {
    return APPS.find((a) => a.id === id);
  }

  getByTenantId(tenantId: string): AppDocument[] {
    return APPS.filter((a) => a.tenantId === tenantId);
  }
}

export class TenantsDataSource {
  list(): TenantDocument[] {
    return TENANTS;
  }

  getById(id: string): TenantDocument {
    return TENANTS.find((t) => t.id === id);
  }
}
