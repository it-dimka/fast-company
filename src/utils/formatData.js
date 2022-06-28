export const getProfessionsById = (id, professions) => {
  for (const prof of professions) {
    if (prof?.value === id) {
      return { _id: prof?.value, name: prof?.label };
    }
  }
};
export const getQualitiesById = (elements, qualities) => {
  const qualitiesArray = [];
  for (const elem of elements) {
    for (const quality in qualities) {
      if (elem.value === qualities[quality].value) {
        qualitiesArray.push({
          _id: qualities[quality].value,
          name: qualities[quality].label,
          color: qualities[quality].color
        });
      }
    }
  }
  return qualitiesArray;
};
export const getDataByLabel = (data) => {
  return Object.keys(data).map((item) => ({
    label: data[item].name,
    value: data[item]._id
  }));
};
export const getQualitiesByLabel = (qualities) => {
  return Object.keys(qualities).map((optionName) => ({
    label: qualities[optionName].name,
    value: qualities[optionName]._id,
    color: qualities[optionName].color
  }));
};
