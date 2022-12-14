import json

with open('./data/datasets.json') as f:
    DATASETS = json.load(f)


def find_datasets_for_app_id(app_id: str) -> list[dict]:
    return [d for d in DATASETS if d.get('appId') == app_id]
