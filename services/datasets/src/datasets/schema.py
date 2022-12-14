from ariadne import QueryType, load_schema_from_path, convert_kwargs_to_snake_case
from ariadne.contrib.federation import make_federated_schema, FederatedObjectType

from datasets.data_source import find_datasets_for_app_id, find_dataset_by_id

type_defs = load_schema_from_path('./schema.graphql')
query = QueryType()
dataset = FederatedObjectType("Dataset")


@query.field("appDatasets")
@convert_kwargs_to_snake_case
def resolve_app_datasets(*_, app_id):
    return find_datasets_for_app_id(app_id)


@query.field("dataset")
@convert_kwargs_to_snake_case
def resolve_dataset(*_, id):
    return find_dataset_by_id(id)


@dataset.reference_resolver
def resolve_dataset_reference(_, _info, representation):
    return find_dataset_by_id(representation.get('id'))


@dataset.field('query')
def resolve_dataset_query(dataset, *_):
    return dataset['query']

@dataset.field('name')
def resolve_dataset_name(dataset, *_):
    return dataset['name']


schema = make_federated_schema(type_defs, query)
