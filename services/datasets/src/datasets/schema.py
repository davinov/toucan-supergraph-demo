from ariadne import QueryType, load_schema_from_path, convert_kwargs_to_snake_case, ObjectType
from ariadne.contrib.federation import make_federated_schema

from datasets.data_source import find_datasets_for_app_id

type_defs = load_schema_from_path('./schema.graphql')
query = QueryType()
datasets = ObjectType("Datasets")

@query.field("appDatasets")
@convert_kwargs_to_snake_case
def resolve_app_datasets(*_, app_id):
    return find_datasets_for_app_id(app_id)


schema = make_federated_schema(type_defs, query)
