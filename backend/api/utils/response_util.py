def row_as_dict(obj, exclude_cols=[]):
    result = {}
    for col in obj.__table__.columns:
        if col.name in exclude_cols:
            continue
        key = col.name
        value = getattr(obj, col.name)
        result.update({key: value})

    return result